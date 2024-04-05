const express = require('express');
const router = express.Router();

const homeController = require("../controllers/HomeController.js")

router.get("/", homeController.homepage)

module.exports = router