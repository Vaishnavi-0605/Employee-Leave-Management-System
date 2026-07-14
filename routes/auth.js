const express=require("express");
const router=express.Router();

const authController=require("../controllers/authController");

router.get("/", authController.loginPage);

router.get("/login",authController.loginPage);

router.post("/login",authController.login);

router.get("/register",authController.register);



module.exports=router;