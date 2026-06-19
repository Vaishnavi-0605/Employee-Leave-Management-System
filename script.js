const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener("click", function () {

    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#pass').value;

    if (email === "" || pass === "") {
        alert("Please enter all the required details.");
        return;
    }

    window.location.href = "dashboard.html";
});