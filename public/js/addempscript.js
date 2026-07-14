document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".employee-form");
    const modal = document.getElementById("employeeModal");

    const inputs = form.querySelectorAll("input, select");
    const errorBoxes = form.querySelectorAll(".errorBox");

    function clearErrors() {
        errorBoxes.forEach(e => e.innerText = "");
        inputs.forEach(i => i.classList.remove("invalid"));
    }

    form.addEventListener("submit", function (e) {

        clearErrors();

        let isValid = true;

        const name = form.empName.value.trim();
        const email = form.empMail.value.trim();
        const phone = form.empPh.value.trim();
        const dept = form.empDept.value;
        const posn = form.posn.value.trim();
        const status = form.status.value;

        const setError = (inputName, message) => {
            const input = form[inputName];
            const errorBox = input.parentElement.querySelector(".errorBox");
            errorBox.innerText = message;
            input.classList.add("invalid");
        };

        // NAME
        if (name.length < 3) {
            setError("empName", "Name must be at least 3 characters");
            isValid = false;
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            setError("empName", "Only letters allowed");
            isValid = false;
        }

        // EMAIL
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("empMail", "Invalid email format");
            isValid = false;
        }

        // PHONE
        if (!/^[0-9]{10}$/.test(phone)) {
            setError("empPh", "Phone must be 10 digits");
            isValid = false;
        }

        // DEPARTMENT
        if (!dept) {
            setError("empDept", "Select department");
            isValid = false;
        }

        // POSITION
        if (posn.length < 2) {
            setError("posn", "Enter valid position");
            isValid = false;
        }

        // STATUS
        if (!status) {
            setError("status", "Select status");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

});