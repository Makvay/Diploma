const form = document.getElementById("news-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "Отправка...";
    status.className = "";

    try {
        const formData = new FormData(form);

        // Шаг 1: если выбрана картинка — загружаем её отдельно
        let imageUrl = null;
        const imageFile = formData.get("image");

        if (imageFile && imageFile.size > 0) {
            const uploadData = new FormData();
            uploadData.append("file", imageFile);

            const uploadResponse = await fetch("/api/news/upload", {
                method: "POST",
                body: uploadData
            });

            if (!uploadResponse.ok) {
                throw new Error("Не удалось загрузить картинку");
            }

            imageUrl = await uploadResponse.text(); // "/uploads/uuid.jpg"
        }

        // Шаг 2: создаём новость
        const authorIdRaw = formData.get("authorId");
        const payload = {
            title: formData.get("title"),
            content: formData.get("content"),
            imageUrl: imageUrl,
            authorId: authorIdRaw ? Number(authorIdRaw) : null
        };

        const response = await fetch("/api/news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const created = await response.json();

        status.textContent = `Новость добавлена (id=${created.id})`;
        status.className = "success";
        form.reset();

        // Через 1.5 секунды — на главную
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);

    } catch (error) {
        console.error(error);
        status.textContent = "Ошибка: " + error.message;
        status.className = "error";
    }
});