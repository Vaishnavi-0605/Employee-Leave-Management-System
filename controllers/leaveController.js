const pool = require("../db");

exports.index = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                lr.leave_id,
                lr.employee_id,
                e.full_name,
                lr.leave_type,
                lr.start_date,
                lr.end_date,
                lr.total_days,
                lr.reason,
                lr.status
            FROM leave_requests lr
            JOIN employees e
            ON lr.employee_id = e.employee_id
            ORDER BY lr.leave_id DESC
        `);

        res.render("leave-req", {
            leaves: result.rows
        });

    } catch (err) {

        console.log(err);

    }

};

exports.approve = async (req, res) => {

    await pool.query(
        "UPDATE leave_requests SET status='Approved' WHERE leave_id=$1",
        [req.params.id]
    );

    res.redirect("/leaves");

};

exports.reject = async (req, res) => {

    await pool.query(
        "UPDATE leave_requests SET status='Rejected' WHERE leave_id=$1",
        [req.params.id]
    );

    res.redirect("/leaves");

};

exports.create = (req, res) => {
    res.redirect("/leaves");
};