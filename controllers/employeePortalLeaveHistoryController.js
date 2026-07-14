const pool = require("../db");

exports.history = async (req, res) => {
    try {
        const employeeId = 5;

        const empResult = await pool.query(
            "SELECT * FROM employees WHERE employee_id = $1",
            [employeeId]
        );
        const employee = empResult.rows[0];

        if (!employee) {
            return res.status(404).send("Employee details not found.");
        }

        const leavesResult = await pool.query(
            `SELECT * 
             FROM leave_requests 
             WHERE employee_id = $1 
             ORDER BY applied_at DESC`,
            [employeeId]
        );

        res.render("employee/history", {
            employee,
            leaves: leavesResult.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Database error occurred while fetching leave history.");
    }
};
