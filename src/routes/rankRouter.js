const express = require("express");
const router = express.Router();

const rankController = require("../controllers/RankControlller");

router.get("/", rankController.index);

module.exports = router;
