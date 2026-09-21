const form = document.getElementById("login-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "Signing in...";
    status.className = "";

    const formData = new FormData(form);
    const payload = {
        username: formData.get("username"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Invalid username or password");
        }

        const user = await response.json();

        status.textContent = `Welcome back, ${user.username}!`;
        status.className = "success";

        setTimeout(() => {
            if (user.role === "ADMIN") {
                window.location.href = "/admin.html";
            } else {
                window.location.href = "/index.html";
            }
        }, 1000);

    } catch (error) {
        console.error(error);
        status.textContent = error.message;
        status.className = "error";
    }
});
