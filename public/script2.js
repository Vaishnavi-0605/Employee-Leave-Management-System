// Safe navigation listener attachment for static HTML pages (redirects)
const navButtons = [
    { selector: "#dashboard-btn", url: "dashboard.html" },
    { selector: "#employees-btn", url: "employees.html" },
    { selector: "#leave-btn", url: "leave-req.html" },
    { selector: "#attendance-btn", url: "attendance.html" },
    { selector: "#logout-btn", url: "index.html" },
    { selector: "#cln-btn", url: "calender.html" }
];

if (window.location.pathname.endsWith('.html') || window.location.pathname.includes('/admin/') || window.location.pathname.includes('/employee/')) {
    navButtons.forEach(btn => {
        const el = document.querySelector(btn.selector);
        if (el) {
            el.addEventListener("click", () => {
                window.location.href = btn.url;
            });
        }
    });

    // Profile page redirect for HTML static mockups
    const profileBtn = document.querySelector(".profile");
    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            window.location.href = "profile.html";
        });
    }
}

// Notification Alert
const notifBtn = document.querySelector(".notif");
if (notifBtn) {
    notifBtn.addEventListener("click", () => {
        alert("No new notifications.");
    });
}

// Sidebar toggle (menu button)
const menuBtn = document.querySelector("#menu-btn");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".content") || document.querySelector("#main-cont");

if (menuBtn && sidebar && mainContent) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("expanded");
    });
}

// Theme Toggle (Light / Dark Mode)
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

// Apply saved theme on initial load
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