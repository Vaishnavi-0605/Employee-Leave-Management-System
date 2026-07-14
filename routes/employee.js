const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload')

const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.index);

router.post("/employees", upload.single('profilePic'),employeeController.create);

router.get("/employees/:id", employeeController.show);

router.get("/employees/:id/edit", employeeController.edit);

router.put("/employees/:id", upload.single('profilePic'),employeeController.update);

router.delete("/employees/:id", employeeController.destroy);

module.exports = router;