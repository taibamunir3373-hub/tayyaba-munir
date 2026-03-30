const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.getLogin); 
router.post("/login", authController.loginUser);
router.get("/register", authController.getRegister);
router.post("/register", authController.registerUser);
router.get("/logout", authController.logout);

module.exports = router;