const express = require("express");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

router.get("/fetch-items/:itemId", itemsController.getItems);


Itemsrouter.get("/fetch-items/:itemId", itemsController.getItems);
Itemsrouter.get('/getAll',itemsController.getAllItems)
Itemsrouter.post('/add',itemsController.addItem)module.exports = router;
