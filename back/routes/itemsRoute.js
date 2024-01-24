const express = require("express");
const itemsController = require("../controllers/itemsController");

const Itemsrouter = express.Router();

Itemsrouter.get("/fetch-items/:itemId", itemsController.getItems);
Itemsrouter.get("/fetch-items/:itemId/bids", itemsController.geBid);
Itemsrouter.get("/fetch-items/", itemsController.getAllItems);
Itemsrouter.get("/fetch-4items/", itemsController.getSidParItems);
Itemsrouter.post("/add", itemsController.addItem);
Itemsrouter.get("/get", itemsController.getAll);
Itemsrouter.get("/itemsBided/:id", itemsController.getItemsBided);
module.exports = Itemsrouter;
