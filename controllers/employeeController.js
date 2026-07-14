const pool = require("../db");
const generatePassword = require("../utils/genpass");
const bcrypt = require("bcrypt");

// GET ALL EMPLOYEES
exports.index = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM employees ORDER BY employee_id"
        );

        res.render("employees", {
            employees: result.rows
        });

    } catch (err) {
        console.log(err.message);
    }
};


// CREATE EMPLOYEE

exports.create = async (req, res) => {

    try {

        const {
            empName,
            empDept,
            posn,
            empMail,
            empPh,
            status,
            gender,
            empJoinDate
        } = req.body;

        const profilePicture = req.file
            ? "uploads/" + req.file.filename
            : null;

        // Generate EMP001, EMP002...

        const count = await pool.query(
            "SELECT MAX(employee_id) AS max_id FROM employees"
        );

        const nextNum = Number(count.rows[0].count || 0) + 1;

        const empCode = "EMP" + String(nextNum).padStart(3, "0");

        const tempPassword = generatePassword();

        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        console.log(req.body.employeeCode);

        await pool.query(

            `INSERT INTO employees
            (
                employee_code,
                full_name,
                department,
                position,
                email,
                phone,
                gender,
                password,
                joining_date,
                status,
                profile_picture
            )

            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11)
            `,

            [
                empCode,
                empName,
                empDept,
                posn,
                empMail,
                empPh,
                gender,
                hashedPassword,
                empJoinDate,
                status || "Active",
                profilePicture
            ]

        );

        const result = await pool.query(
            "SELECT * FROM employees ORDER BY employee_id"
        );
        
        res.render("employees", {
            employees: result.rows,
            credentials: {
                name: empName,
                email: empMail,
                password: tempPassword
            }
        });

    }

    catch (err) {

        console.log(err.message);

    }

};


// SHOW ONE EMPLOYEE

exports.show = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(

            "SELECT * FROM employees WHERE employee_code = $1",

            [id]

        );

        if (result.rows.length === 0) {

            return res.send("Employee not found");

        }

        res.render("show", {

            emp: result.rows[0]

        });

    }

    catch (err) {

        console.log(err.message);

    }

};


// EDIT PAGE

exports.edit = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(

            "SELECT * FROM employees WHERE employee_code = $1",

            [id]

        );

        if (result.rows.length === 0) {

            return res.send("Employee not found");

        }

        res.render("edit-employee", {

            emp: result.rows[0]

        });

    }

    catch (err) {

        console.log(err.message);

    }

};


// UPDATE EMPLOYEE

exports.update = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            empName,
            empDept,
            posn,
            empMail,
            empPh,
            empJoinDate,
            status,
            gender

        } = req.body;

        let profilePicture;

        if (req.file) {

            profilePicture = "uploads/" + req.file.filename;

            await pool.query(

                `UPDATE employees

                SET

                full_name = $1,
                department = $2,
                position = $3,
                email = $4,
                phone = $5,
                joining_date = $6,
                status = $7,
                gender = $8,
                profile_picture = $9

                WHERE employee_code = $10`,

                [

                    empName,
                    empDept,
                    posn,
                    empMail,
                    empPh,
                    empJoinDate,
                    status,
                    gender,
                    profilePicture,
                    id

                ]

            );

        } else {

            await pool.query(

                `UPDATE employees

                SET

                full_name = $1,
                department = $2,
                position = $3,
                email = $4,
                phone = $5,
                joining_date = $6,
                status = $7,
                gender = $8

                WHERE employee_code = $9`,

                [

                    empName,
                    empDept,
                    posn,
                    empMail,
                    empPh,
                    empJoinDate,
                    status,
                    gender,
                    id

                ]

            );

        }

        res.redirect("/employees");

    }

    catch (err) {

        console.log(err.message);

    }

};


// DELETE EMPLOYEE

exports.destroy = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            "DELETE FROM employees WHERE employee_code = $1",

            [id]

        );

        res.redirect("/employees");

    }

    catch (err) {

        console.log(err.message);

    }

};