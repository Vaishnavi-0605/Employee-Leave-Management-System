const employees=require("../models/dummydata/employee");
const leaves=require("../models/dummydata/leave");


exports.dashboard=(req,res)=>{

res.render("dashboard", {

totalEmployees:employees.length,

pendingLeaves:
leaves.filter(l=>l.status==="Pending").length,

approvedLeaves:
leaves.filter(l=>l.status==="Approved").length,

rejectedLeaves:
leaves.filter(l=>l.status==="Rejected").length,

leaves

});


};