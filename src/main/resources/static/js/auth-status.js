async function updateAuthStatus() {
    try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
            const user = await response.json();
            const nav = document.querySelector(".header nav");


            document.querySelectorAll(".header nav a").forEach(a => {
                if (a.textContent === "sign in" || a.textContent === "register") {
                    a.remove();
                }
            });


            const userLink = document.createElement("a");
            userLink.href = "#";
            userLink.textContent = user.username;
            userLink.title = user.role;

            const logoutLink = document.createElement("a");
            logoutLink.href = "#";
            logoutLink.textContent = "logout";
            logoutLink.onclick = async (e) => {
                e.preventDefault();
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.reload();
            };

            nav.appendChild(userLink);
            nav.appendChild(logoutLink);
        }
    } catch (e) {

    }
}

updateAuthStatus();