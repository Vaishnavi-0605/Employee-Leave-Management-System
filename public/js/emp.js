let searchInput = document.getElementById("searchInput");
let rows = document.querySelectorAll(".employee-row");

searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    rows.forEach(row => {

        const name = row.dataset.name.toLowerCase();
        const dept = row.dataset.dept.toLowerCase();
        const email = row.dataset.email.toLowerCase();

        if (
            name.includes(value) ||
            dept.includes(value) ||
            email.includes(value)
        ) {
            row.style.display = "grid";
        } else {
            row.style.display = "none";
        }
    });

});

let dept = document.querySelector('#deptId');

dept.addEventListener('change', function () {
    deptval = this.value.toLowerCase();

    rows.forEach(row => {
        let d = row.dataset.dept.toLowerCase();

        if(deptval == "all departments" || d == deptval){
            row.style.display="grid";
        }
        else{
            row.style.display = "none";
        }
    });
});

let status = document.querySelector('#stat');

status.addEventListener('change', function () {
    statval = this.value.toLowerCase();

    rows.forEach(row => {
        let s = row.dataset.status.toLowerCase();

        if(statval == "all status" || s == statval){
            row.style.display="grid";
        }
        else{
            row.style.display = "none";
        }
    });
});

document.querySelector(".exp").addEventListener("click", function () {

    let rows = document.querySelectorAll(".employee-row");

    let csv = "Name,ID,Department,Attendance,Position,Status,Email\n";

    rows.forEach(row => {

        let name = row.dataset.name;
        let dept = row.dataset.dept;
        let status = row.dataset.status;
        let email = row.dataset.email;

        let cells = row.querySelectorAll("div");

        let attendance = cells[2]?.innerText || "";
        let position = cells[3]?.innerText || "";

        csv += `${name},${row.querySelector("p").innerText},${dept},${attendance},${position},${status},${email}\n`;
    });

    // download file
    let blob = new Blob([csv], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "employees_report.csv";
    a.click();

    window.URL.revokeObjectURL(url);
});