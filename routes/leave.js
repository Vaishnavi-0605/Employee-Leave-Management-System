const express = require("express");
const router = express.Router();

const leaveController = require("../controllers/leaveController");

router.get("/leaves", leaveController.index);

router.post("/leaves", leaveController.create);

router.post("/leaves/:id/approve", leaveController.approve);

router.post("/leaves/:id/reject", leaveController.reject);

module.exports = router;