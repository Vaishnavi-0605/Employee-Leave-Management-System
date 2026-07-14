const profile = require("../models/dummydata/profile");
const attendance = require("../models/dummydata/attendance");

exports.show = (req, res) => {

    res.render("profile", {
        profile
    });

};



exports.update = (req, res) => {

    let {
        empName,
        empMail,
        empPh,
        gender
    } = req.body;

    profile.empName = empName;
    profile.empMail = empMail;
    profile.empPh = empPh;
    profile.gender = gender;

    res.redirect("/profile");

};



exports.attendance = (req, res) => {

    res.render("attendance", {
        attendance
    });

};



exports.calendar = (req, res) => {

    res.render("calendar");

};



exports.changePasswordPage = (req, res) => {

    res.render("changepass");

};



exports.changePassword = (req, res) => {

    let {
        oldPassword,
        newPassword,
        confirmPassword
    } = req.body;

    if (newPassword !== confirmPassword) {
        return res.send("Passwords do not match!");
    }

    console.log("Password changed successfully.");

    res.redirect("/profile");

};