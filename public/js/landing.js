/* PreLeave Landing Page Dedicated JavaScript */

document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-toggle");

    // Helper to apply theme changes
    const applyTheme = (theme) => {
        const html = document.documentElement;
        if (theme === "dark") {
            html.setAttribute("data-theme", "dark");
            if (themeBtn) {
                themeBtn.classList.remove("bi-moon-fill");
                themeBtn.classList.add("bi-brightness-high-fill");
            }
        } else {
            html.removeAttribute("data-theme");
            if (themeBtn) {
                themeBtn.classList.remove("bi-brightness-high-fill");
                themeBtn.classList.add("bi-moon-fill");
            }
        }
    };

    // Load initial theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Default to dark or match browser preferences
        applyTheme("light");
    }

    // Toggle theme on click
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
            localStorage.setItem("theme", currentTheme);
            applyTheme(currentTheme);
        });
    }
});
