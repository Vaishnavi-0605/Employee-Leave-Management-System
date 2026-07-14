const pool = require("../db");

exports.index = async (req, res) => {

    try {

        const totalEmployees = await pool.query(
            "SELECT COUNT(*) FROM employees"
        );
        
        const activeEmployees = await pool.query(
            "SELECT COUNT(*) FROM employees WHERE status = 'Active'"
        );
        
        const inactiveEmployees = await pool.query(
            "SELECT COUNT(*) FROM employees WHERE status = 'Inactive'"
        );
        
        const onLeaveEmployees = await pool.query(
        `
        SELECT COUNT(DISTINCT employee_id)
        FROM leave_requests
        WHERE status = 'Approved'
        AND CURRENT_DATE BETWEEN start_date AND end_date
        `
        );

        const recentLeaves = await pool.query(`
            SELECT
                lr.leave_id,
                lr.leave_type,
                lr.start_date,
                lr.end_date,
                lr.total_days,
                lr.status,
                e.full_name,
                e.employee_code
            FROM leave_requests lr
            JOIN employees e
                ON lr.employee_id = e.employee_id
            ORDER BY lr.applied_at DESC
            LIMIT 5;
        `);

        res.render("dashboard", {

            totalEmployees: totalEmployees.rows[0].count,

            activeEmployees: activeEmployees.rows[0].count,

            onLeaveEmployees: onLeaveEmployees.rows[0].count,

            inactiveEmployees: inactiveEmployees.rows[0].count,

            leaves: recentLeaves.rows

        });

    }

    catch (err) {

        console.log(err);

    }

};