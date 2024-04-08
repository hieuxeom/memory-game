const express = require("express");
const router = express.Router();

const adminGameTopicsController = require("../../controllers/admin/AdminGameTopicsController");

router.get("/", adminGameTopicsController.index);
router.get("/all", adminGameTopicsController.index);
router.get("/add", adminGameTopicsController.add);
router.get("/edit", adminGameTopicsController.edit);
router.get("/trash", adminGameTopicsController.trash);

module.exports = router;
