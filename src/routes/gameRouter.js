const express = require("express");
const router = express.Router();

const gameController = require("../controllers/GameController.js")

router.get("/", gameController.config);
router.get("/config", gameController.config);
router.get("/play", gameController.play)

module.exports = router;
