const pool = require("../db");

exports.index = async (req, res) => {
    try {

        const total = await pool.query(`
            SELECT COUNT(*) FROM employees
            WHERE status='Active'
        `);

        const onLeave = await pool.query(`
            SELECT COUNT(DISTINCT employee_id)
            FROM leave_requests
            WHERE status='Approved'
            AND CURRENT_DATE BETWEEN start_date AND end_date
        `);

        res.render("attendance", {
            attendance: {
                overallRate: "95%",
                presentCount: Number(total.rows[0].count) - Number(onLeave.rows[0].count),
                absentCount: 0,
                lateCount: 0,
                onLeaveCount: onLeave.rows[0].count,
                dept: []
            }
        });

    } catch (err) {
        console.log(err);
    }
};