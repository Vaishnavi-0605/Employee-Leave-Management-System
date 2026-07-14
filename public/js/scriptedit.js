document.addEventListener("DOMContentLoaded", function () {

    let form = document.getElementById("editForm");

    let nameError = document.getElementById("nameError");
    let deptError = document.getElementById("deptError");
    let posnError = document.getElementById("posnError");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");
    let dateError = document.getElementById("dateError");
    let statusError = document.getElementById("statusError");

    form.addEventListener("submit", function (e) {

        let isValid = true;

        document.querySelectorAll(".errorBox").forEach(el => el.innerText = "");
        document.querySelectorAll("input, select").forEach(el => el.classList.remove("invalid"));

        let name = form.empName.value.trim();
        let dept = form.empDept.value;
        let posn = form.posn.value.trim();
        let email = form.empMail.value.trim();
        let phone = form.empPh.value.trim();
        let date = form.empJoinDate.value;
        let status = form.status.value;

        // NAME
        if (name.length < 3) {
            nameError.innerText = "Name must be at least 3 characters";
            form.empName.classList.add("invalid");
            isValid = false;
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            nameError.innerText = "Only letters allowed";
            form.empName.classList.add("invalid");
            isValid = false;
        }

        // DEPARTMENT
        if (!dept) {
            deptError.innerText = "Select department";
            form.empDept.classList.add("invalid");
            isValid = false;
        }

        // POSITION
        if (posn.length < 2) {
            posnError.innerText = "Position too short";
            form.posn.classList.add("invalid");
            isValid = false;
        }

        // EMAIL
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.innerText = "Invalid email";
            form.empMail.classList.add("invalid");
            isValid = false;
        }

        // PHONE
        if (!/^[0-9]{10}$/.test(phone)) {
            phoneError.innerText = "Phone must be 10 digits";
            form.empPh.classList.add("invalid");
            isValid = false;
        }

        // DATE
        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            dateError.innerText = "Date cannot be in future";
            form.empJoinDate.classList.add("invalid");
            isValid = false;
        }

        // STATUS
        if (!status) {
            statusError.innerText = "Select status";
            form.status.classList.add("invalid");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

});