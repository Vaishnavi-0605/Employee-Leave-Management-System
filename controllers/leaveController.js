const leaves = require("../models/dummydata/leave");

exports.index = (req, res) => {

    res.render("leave-req", {
        leaves
    });

};



exports.create = (req, res) => {

    let {
        empId,
        empName,
        leaveType,
        fromDate,
        toDate,
        days,
        reason
    } = req.body;

    let leave = {

        reqId: leaves.length + 1,
        empId,
        empName,
        leaveType,
        fromDate,
        toDate,
        days: parseInt(days),
        reason,
        status: "Pending"

    };

    leaves.push(leave);

    res.redirect("/leaves");

};



exports.approve = (req, res) => {

    let id = parseInt(req.params.id);

    let leave = leaves.find(l => l.reqId === id);

    if (leave) {
        leave.status = "Approved";
    }

    res.redirect("/leaves");

};



exports.reject = (req, res) => {

    let id = parseInt(req.params.id);

    let leave = leaves.find(l => l.reqId === id);

    if (leave) {
        leave.status = "Rejected";
    }

    res.redirect("/leaves");

};