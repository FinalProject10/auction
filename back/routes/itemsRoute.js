const express = require("express");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

router.get("/fetch-items/:itemId", itemsController.getItems);

module.exports = router;
