const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");

router.get("/", authController.index);
router.get("/password", authController.loginWithPassword)
router.get("/register", authController.register)
router.get("/signout", authController.signOut)

module.exports = router;
