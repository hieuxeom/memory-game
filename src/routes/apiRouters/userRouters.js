const express = require("express");
const router = express.Router();

const apiUser = require("../../controllers/api/ApiUserController");

router.get("/", apiUser.getAllUsers);
router.get("/:userId", apiUser.getUserById);

module.exports = router;