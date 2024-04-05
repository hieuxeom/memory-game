const express= require('express');
const router = express.Router();

const apiGameResult = require("../../controllers/api/ApiGameResultController");
router.post("/", apiGameResult.handleResult)

module.exports = router