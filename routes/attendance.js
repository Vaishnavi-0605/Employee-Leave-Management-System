const express = require("express");
const router = express.Router();

const controller = require("../controllers/attendanceController");

router.get("/attendance", controller.index);

module.exports = router;