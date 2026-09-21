const form = document.getElementById("register-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "Registering...";
    status.className = "";

    const formData = new FormData(form);
    const payload = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const user = await response.json();

        status.textContent = `Welcome, ${user.username}! Redirecting...`;
        status.className = "success";

        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);

    } catch (error) {
        console.error(error);
        status.textContent = "Error: " + error.message;
        status.className = "error";
    }
});