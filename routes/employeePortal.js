const express = require("express");
const router = express.Router();

const controller = require("../controllers/employeePortalController");
const historyController = require("../controllers/employeePortalLeaveHistoryController");
const applyController = require("../controllers/employeePortalApplyLeaveController");

// Login (GET renders, POST redirects to dashboard ignoring auth)
router.get("/employee/login", controller.login);
router.post("/employee/login", controller.loginPost);

// Dashboard
router.get("/employee/dashboard", controller.dashboard);

// Profile
router.get("/employee/profile", controller.profile);

// Apply Leave (GET & POST map to employeePortalApplyLeaveController)
router.get("/employee/apply", applyController.applyPage);
router.post("/employee/apply", applyController.submitApply);

// Leave History (GET /employee/history maps to employeePortalLeaveHistoryController)
router.get("/employee/history", historyController.history);

// Leave Rules
router.get("/employee/rules", controller.rules);

// Contact
router.get("/employee/contact", controller.contact);

module.exports = router;