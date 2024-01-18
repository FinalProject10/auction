const express = require("express");
const itemsController = require("../controllers/itemsController");

const Itemsrouter = express.Router();

Itemsrouter.get("/fetch-items/:itemId", itemsController.getItems);
Itemsrouter.get('/getAll',itemsController.getAllItems)
Itemsrouter.post('/add',itemsController.addItem)
module.exports = Itemsrouter;
