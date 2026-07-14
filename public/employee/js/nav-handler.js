const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const html = document.documentElement;
        if (html.getAttribute("data-theme") === "dark") {
            themeBtn.classList.remove("bi-brightness-high-fill");
            html.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeBtn.classList.add("bi-moon-fill");
        } else {
            html.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeBtn.classList.remove("bi-moon-fill");
            themeBtn.classList.add("bi-brightness-high-fill");
        }
    });
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeBtn) {
        themeBtn.classList.remove("bi-moon-fill");
        themeBtn.classList.add("bi-brightness-high-fill");
    }
} else {
    if (themeBtn) {
        themeBtn.classList.add("bi-moon-fill");
    }
}

const menuBtn = document.querySelector("#menu-btn");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-container");

if (menuBtn && sidebar && mainContent) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("expanded");
    });
}

const notifBtn = document.querySelector(".notif");
if (notifBtn) {
    notifBtn.addEventListener("click", () => {
        alert("No new notifications.");
    });
}
