const express = require('express');
const router = express.Router();

const apiRank = require("../../controllers/api/ApiRankController");
router.get("/", apiRank.get)

module.exports = router