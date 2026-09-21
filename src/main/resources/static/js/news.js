const newsList = document.querySelector(".news-list");

async function loadNews() {
    try {
        const response = await fetch("/api/news");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const news = await response.json();

        if (news.length === 0) {
            newsList.innerHTML = `<p class="news-empty">There is no news yet.</p>`;
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
                ? `<p class="news-author">Author: ${item.authorUsername}</p>`
                : "";

            const dateHtml = item.createdAt
                ? `<p class="news-date">${new Date(item.createdAt).toLocaleString("en-EN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })}</p>`
                : "";

            card.innerHTML = `
                ${imageHtml}
                <h3>${item.title}</h3>
                ${dateHtml}
                ${authorHtml}
                <p>${item.content}</p>
            `;

            newsList.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading news:", error);
        newsList.innerHTML = `<p class="news-error">Failed to load news</p>`;
    }
}

loadNews();