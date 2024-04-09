const express = require("express");
const router = express.Router();

const apiUser = require("../../controllers/api/ApiUserController");

router.get("/", apiUser.getAllUsers);
router.get("/:userId", apiUser.getUserById);
router.get("/:userId/streak", apiUser.getStreak);
router.get("/:userId/get-rewards", apiUser.getStreakReward);

module.exports = router;
