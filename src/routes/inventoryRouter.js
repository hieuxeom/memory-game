const express = require('express');
const router = express.Router();
const inventoryController = require("../controllers/InventoryController.js");

router.get("/", inventoryController.index)


module.exports = router