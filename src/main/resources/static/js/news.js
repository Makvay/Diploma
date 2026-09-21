const newsList = document.querySelector(".news-list");

async function loadNews() {
    try {
        const response = await fetch("/api/news");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const news = await response.json();

        if (news.length === 0) {
            newsList.innerHTML = `<p class="news-empty">Пока новостей нет</p>`;
            return;
        }

        newsList.innerHTML = "";

        news.forEach(item => {
            const card = document.createElement("article");
            card.className = "news-card";

            const imageHtml = item.imageUrl
                ? `<img src="${item.imageUrl}" alt="${item.title}" class="news-image">`
                : "";

            const authorHtml = item.authorUsername
                ? `<p class="news-author">Автор: ${item.authorUsername}</p>`
                : "";

            card.innerHTML = `
                ${imageHtml}
                <h3>${item.title}</h3>
                ${authorHtml}
                <p>${item.content}</p>
            `;

            newsList.appendChild(card);
        });

    } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
        newsList.innerHTML = `<p class="news-error">Не удалось загрузить новости</p>`;
    }
}

loadNews();