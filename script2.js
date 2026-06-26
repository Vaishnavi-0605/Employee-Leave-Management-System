document.querySelector("#dashboard-btn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

document.querySelector("#employees-btn").addEventListener("click", () => {
    window.location.href = "employees.html";
});

document.querySelector("#leave-btn").addEventListener("click", () => {
    window.location.href = "leave-req.html";
});

document.querySelector("#attendance-btn").addEventListener("click", () => {
    window.location.href = "attendance.html";
});

document.querySelector("#logout-btn").addEventListener("click", () => {
    window.location.href = "index.html";
});


// document.querySelector("#reports-btn").addEventListener("click", () => {
//     window.location.href = "reports.html";
// });

// document.querySelector("#settings-btn").addEventListener("click", () => {
//     window.location.href = "settings.html";
// });

document.querySelector(".profile").addEventListener("click", () => {
    window.location.href = "profile.html";
});


document.querySelector(".notif").addEventListener("click", () => {
    alert("No new notifications.");
});

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.classList.remove("bi-brightness-high-fill");
        themeToggle.classList.add("bi-moon-fill");
    } else {
        themeToggle.classList.remove("bi-moon-fill");
        themeToggle.classList.add("bi-brightness-high-fill");
    }
});

const menuBtn = document.querySelector("#menu-btn");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector("#main-cont");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("expanded");
});

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
    const html = document.documentElement;

    if (html.getAttribute("data-theme") === "dark") {
        html.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}