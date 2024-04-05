const express = require('express');
const router = express.Router();

const apiShop = require("../../controllers/api/ApiShopController");

router.post("/", apiShop.buy)

module.exports = router