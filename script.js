// Configuration
const GITHUB_USERNAME = "Bhagyashree-Patel"
const REPO_CONTAINER = document.getElementById("repo-container")

// Fallback Data (Used if API fails or user doesn't exist)
const FALLBACK_DATA = [
    {
        name: "E-Commerce-Dashboard",
        description:
            "A premium analytics dashboard for online retailers featuring real-time data visualization and inventory management.",
        language: "React",
        stargazers_count: 12,
        forks_count: 4,
        html_url: "#",
    },
    {
        name: "Neural-Network-Visualizer",
        description:
            "Interactive web tool to visualize how simple neural networks learn patterns in real-time using Canvas API.",
        language: "Python",
        stargazers_count: 28,
        forks_count: 9,
        html_url: "#",
    },
    {
        name: "Task-Master-Pro",
        description:
            "A minimalist productivity application with drag-and-drop interface and local storage synchronization.",
        language: "JavaScript",
        stargazers_count: 8,
        forks_count: 2,
        html_url: "#",
    },
    {
        name: "Portfolio-v1",
        description: "My personal developer portfolio showcasing projects and skills with a focus on accessible UI design.",
        language: "HTML/CSS",
        stargazers_count: 15,
        forks_count: 3,
        html_url: "#",
    },
]

// Function to create a Repo Card HTML
function createCard(repo) {
    const lang = repo.language || "Development"
    const desc = repo.description || "A software development project focusing on clean architecture and performance."

    return `
    <div class="repo-card">
        <div>
            <span class="repo-lang">${lang}</span>
            <h3 class="repo-name">${repo.name.replace(/-/g, " ")}</h3>
            <p class="repo-desc">${desc}</p>
        </div>
        <div class="repo-stats">
            <span>★ ${repo.stargazers_count}</span>
            <span>⑂ ${repo.forks_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="repo-link">↗</a>
    </div>
    `
}

// Fetch Data
async function loadPortfolio() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)

        if (!response.ok) throw new Error("User not found")

        const repos = await response.json()

        if (repos.length === 0) throw new Error("No public repos")

        // Render Real Data
        REPO_CONTAINER.innerHTML = repos.map(createCard).join("")
    } catch (error) {
        console.log("Falling back to simulation mode due to:", error.message)
        // Render Fallback Data
        REPO_CONTAINER.innerHTML = FALLBACK_DATA.map(createCard).join("")
    } finally {
        // Remove Loader
        setTimeout(() => {
            document.getElementById("loader").style.opacity = "0"
            setTimeout(() => document.getElementById("loader").remove(), 500)
        }, 800)
    }
}



// Event Listeners
window.addEventListener("DOMContentLoaded", loadPortfolio)

// Set copyright year
document.getElementById("year").textContent = new Date().getFullYear()

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})
