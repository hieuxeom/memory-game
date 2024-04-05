const express = require("express");
const router = express.Router();

const profileController = require("../controllers/ProfileController");

router.get("/", profileController.index);
router.get("/history", profileController.history);
router.get("/change-pwd", profileController.changePassword);

module.exports = router;
