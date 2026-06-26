const leaveModal = document.querySelector("#leaveModal");
const closeLeaveModal = document.querySelector("#closeLeaveModal");

const modalName = document.querySelector("#modalName");
const modalEmpId = document.querySelector("#modalEmpId");
const modalType = document.querySelector("#modalType");
const modalFrom = document.querySelector("#modalFrom");
const modalTo = document.querySelector("#modalTo");
const modalReason = document.querySelector("#modalReason");
const modalStatus = document.querySelector("#modalStatus");


let currentStatusTag = null;

document.querySelectorAll(".table-row").forEach((row, index) => {
    if (index === 0) return;
    
    row.addEventListener("click", (e) => {
        
        if (
            e.target.classList.contains("approve-btn") ||
            e.target.classList.contains("reject-btn")
        ) {
            return;
        }
        
        modalName.textContent =
        row.querySelector(".employee-cell h4").textContent;
        
        modalEmpId.textContent =
        row.querySelector(".employee-cell p").textContent;
        
        modalType.textContent =
        row.children[1].innerText.trim();
        
        modalFrom.textContent =
        row.children[2].innerText.trim();
        
        modalTo.textContent =
        row.children[3].innerText.trim();
        
        modalReason.textContent =
        row.children[5].innerText.trim();
        
        currentStatusTag =
        row.querySelector(".pending, .approved, .rejected");
        
        modalStatus.textContent =
        currentStatusTag.textContent;
        
        leaveModal.style.display = "flex";
        leaveModal.style.font = "Manrope", sans-serif;
    });
    
});

closeLeaveModal.addEventListener("click", () => {
    leaveModal.style.display = "none";
});
window.addEventListener("click", (e) => {
    if (e.target === leaveModal) {
        leaveModal.style.display = "none";
    }
});

const approveBtn = document.querySelector(".approve-btn");
const rejectBtn = document.querySelector(".reject-btn");

approveBtn.addEventListener("click", () => {
    
    currentStatusTag.textContent = "Approved";
    
    currentStatusTag.classList.remove("pending", "rejected");
    currentStatusTag.classList.add("approved");

    modalStatus.textContent = "Approved";

    leaveModal.style.display = "none";
});

rejectBtn.addEventListener("click", () => {

    currentStatusTag.textContent = "Rejected";

    currentStatusTag.classList.remove("pending", "approved");
    currentStatusTag.classList.add("rejected");

    modalStatus.textContent = "Rejected";

    leaveModal.style.display = "none";
});