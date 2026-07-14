const pool = require("../db");

exports.login = (req, res) => {
    res.render("employee/login", {
        error: null
    });
};

exports.loginPost = (req, res) => {
    res.redirect("/employee/dashboard");
};

async function getEmployeeDetails(employeeId) {
    const result = await pool.query(
        "SELECT * FROM employees WHERE employee_id = $1",
        [employeeId]
    );
    return result.rows[0];
}

exports.dashboard = async (req, res) => {
    try {
        const employeeId = 5;

        const employee = await getEmployeeDetails(employeeId);
        if (!employee) {
            return res.status(404).send("Employee not found.");
        }

        const pendingResult = await pool.query(
            `SELECT COUNT(*) 
             FROM leave_requests 
             WHERE employee_id = $1 
             AND status = 'Pending'`,
            [employeeId]
        );
        const pendingLeaves = parseInt(pendingResult.rows[0].count);

        const leavesResult = await pool.query(
            `SELECT * 
             FROM leave_requests 
             WHERE employee_id = $1 
             ORDER BY applied_at DESC 
             LIMIT 5`,
            [employeeId]
        );

        const paid = await pool.query(`
            SELECT COALESCE(SUM(total_days),0) AS used
            FROM leave_requests
            WHERE employee_id = $1
            AND leave_type = 'Paid Leave'
            AND status = 'Approved'
        `, [employeeId]);

        const casual = await pool.query(`
            SELECT COALESCE(SUM(total_days),0) AS used
            FROM leave_requests
            WHERE employee_id = $1
            AND leave_type = 'Casual Leave'
            AND status = 'Approved'
        `, [employeeId]);
        
        const sick = await pool.query(`
            SELECT COALESCE(SUM(total_days),0) AS used
            FROM leave_requests
            WHERE employee_id = $1
            AND leave_type = 'Sick Leave'
            AND status = 'Approved'
        `, [employeeId]);
        
        const paidRemaining = 20 - Number(paid.rows[0].used);
        const casualRemaining = 12 - Number(casual.rows[0].used);
        const sickRemaining = 12 - Number(sick.rows[0].used);

       res.render("employee/dashboard", {
            employee,
            pendingLeaves,
            leaves: leavesResult.rows,

            paidRemaining,
            casualRemaining,
            sickRemaining
        });
    } catch (err) {
        console.error(err.message);
    }
};

exports.profile = async (req, res) => {
    try {
        const employeeId = 5;
        const employee = await getEmployeeDetails(employeeId);
        
        if (!employee) {
            return res.status(404).send("Employee not found.");
        }

        res.render("employee/profile", { employee });
    } catch (err) {
        console.error(err.message);
    }
};

exports.apply = async (req, res) => {
    try {
        const employeeId = 5;
        const employee = await getEmployeeDetails(employeeId);

        if (!employee) {
            return res.status(404).send("Employee not found.");
        }

        res.render("employee/apply", { employee });
    } catch (err) {
        console.error(err.message);
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
    }
};

exports.history = async (req, res) => {
    try {
        const employeeId = 5;
        
        const employee = await getEmployeeDetails(employeeId);
        if (!employee) {
            return res.status(404).send("Employee not found.");
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
    }
};

exports.rules = async (req, res) => {
    try {
        const employeeId = 5;
        const employee = await getEmployeeDetails(employeeId);
        res.render("employee/rules", { employee });
    } catch (err) {
        console.error(err.message);
    }
};

exports.contact = async (req, res) => {
    try {
        const employeeId = 5;
        const employee = await getEmployeeDetails(employeeId);
        res.render("employee/contact", { employee });
    } catch (err) {
        console.error(err.message);
    }
};
