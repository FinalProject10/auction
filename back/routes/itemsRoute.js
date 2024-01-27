const express = require("express");
const itemsController = require("../controllers/itemsController");

const Itemsrouter = express.Router();

Itemsrouter.get("/fetch-items/:itemId", itemsController.getItems);
Itemsrouter.get("/fetch-items/:userId/bids", itemsController.geBid);
Itemsrouter.get("/fetch-items/", itemsController.getAllItems);
Itemsrouter.post("/add", itemsController.addItem);
Itemsrouter.get("/get", itemsController.getAll);
Itemsrouter.get("/itemsBided/:id", itemsController.getItemsBided);
Itemsrouter.get('/items-winner/:id',itemsController.getitemswinner)
module.exports = Itemsrouter;
