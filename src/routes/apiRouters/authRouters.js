const express = require("express");
const router = express.Router();

const apiAuth = require("../../controllers/api/ApiAuthController");

router.post("/googleSignIn", apiAuth.loginWithGoogle);
router.post("/register", apiAuth.credentialsRegister)
router.post("/login", apiAuth.loginWithPassword)
router.post("/change-pwd", apiAuth.changePassword)

module.exports = router;