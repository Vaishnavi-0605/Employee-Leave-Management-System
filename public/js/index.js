let form = document.querySelector('#loginfm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    let email = form.email.value.trim();
    let pass = form.password;
    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError")

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.innerText = "Invalid email";
        form.email.classList.add("invalid");
        isValid = false;
    } else {
        emailError.innerText = "";
        form.email.classList.remove("invalid");
    }

    if(pass.length < 8){
        passError.innerText = "Password must be atleast 8 characters";
        form.password.classList.add("invalid");
        isValid = false;
    }
    else{
        passError.innerText = "";
        form.password.classList.remove("invalid");
    }

    if (isValid) {
        form.submit();
    }
});

function togglePassword() {
    let input = document.querySelector("#pass");
    let icon = document.getElementById("toggle-eye");

    console.log('Click');
    

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}