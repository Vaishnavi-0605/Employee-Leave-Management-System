const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

router.get("/profile", profileController.show);

router.put("/profile", profileController.update);

router.get("/attendance", profileController.attendance);

router.get("/calendar", profileController.calendar);

router.get("/changepass", profileController.changePasswordPage);

router.post("/changepass", profileController.changePassword);

module.exports = router;