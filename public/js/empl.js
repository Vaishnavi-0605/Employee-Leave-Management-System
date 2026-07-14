document.querySelector('.exp').addEventListener('click', ()=>{
    alert('Your Report is downloading...');

    setTimeout(()=>{
        alert('Your Report is Downloaded.')
    }, 2000)
})

const modal = document.getElementById("employeeModal");

const openBtn = document.querySelector("#addEmployeeBtn");

const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
    console.log('click');
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const saveBtn = document.querySelector("#save-emp-btn");
const table = document.querySelector(".employee-table");
// const modal = document.querySelector("#employeeModal");

saveBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("empName").value;
    const id = document.getElementById("empId").value;
    const dept = document.getElementById("empDept").value;
    const joined = document.getElementById("empJoinDate").value;
    const pos = document.getElementById("posn").value;
    const mail = document.getElementById("empMail").value;
    const ph = document.getElementById("empPh").value;

    const initials = name
        .split(" ")
        .map(word => word[0])
        .join("");

    const newRow = document.createElement("div");
    newRow.className = "table-row";

    newRow.innerHTML = `
        <div class="employee-cell">
            <div class="avatar">${initials}</div>
            <div>
                <strong>${name}</strong>
                <p>${id}</p>
            </div>
        </div>

        <div>${dept}</div>
        <div>0%</div>
        <div>${pos}</div>
        <div>${joined}</div>
        <div>Active</div>
        <div>${mail}</div>
        <div class="act-icon">
            <a href="/employees/<%= emp.empId %>/edit" style="color: black; font-size: 24px; margin-right: 28px;"><i class="bi bi-pencil-fill"></i></a>
            <a href="/employees/<%= emp.empId %>/del" style="color: red; font-size: 24px; margin-left: 48px;"><i class="bi bi-trash-fill"></i></a>
        </div>    

    `;

    table.appendChild(newRow);

    modal.style.display = "none";
});