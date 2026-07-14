const pool = require("../db");

async function getEmployeeDetails(employeeId) {
    const result = await pool.query(
        "SELECT * FROM employees WHERE employee_id = $1",
        [employeeId]
    );
    return result.rows[0];
}

exports.applyPage = async (req, res) => {
    try {
        const employeeId = 5;
        const employee = await getEmployeeDetails(employeeId);

        if (!employee) {
            return res.status(404).send("Employee not found.");
        }

        res.render("employee/apply", { employee });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Database error occurred.");
    }
};

exports.submitApply = async (req, res) => {
    try {
        const employeeId = 5;
        const { leaveType, fromDate, toDate, reason } = req.body;

        if (!leaveType || !fromDate || !toDate) {
            return res.status(400).send("Please fill in all required fields.");
        }

        const start = new Date(fromDate);
        const end = new Date(toDate);
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

        await pool.query(
            `INSERT INTO leave_requests (
                employee_id, 
                leave_type, 
                start_date, 
                end_date, 
                total_days, 
                reason, 
                status
            ) VALUES ($1, $2, $3, $4, $5, $6, 'Pending')`,
            [
                employeeId,
                leaveType,
                fromDate,
                toDate,
                totalDays,
                reason ? reason.trim() : ""
            ]
        );

        res.redirect("/employee/history");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Database error occurred while submitting leave request.");
    }
};
