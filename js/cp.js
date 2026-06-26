const Btn = document.querySelector('#cp');

Btn.addEventListener("click", function () {

    const op = document.querySelector('.oldpass').value;
    const np = document.querySelector('.newpass').value;

    if (op === "" || np === "") {
        alert("Please enter all the required details.");
        return;
    }
    else if( op == np){
        alert("Please enter a new password");
        return;
    }

    window.location.href = "dashboard.html";
    alert('Password Changed!');
});

