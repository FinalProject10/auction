const sellerRouter = require("express").Router();
const sellerContr = require("../controllers/seller");
const mid = require("../middleware/middleware");
const sellersController = require("../controllers/sellerControler");
sellerRouter.get("/profile", sellersController.getAllSeller);
sellerRouter.get("/profile/:itemId", sellersController.getSellerById);
sellerRouter.post("/register", sellerContr.register);
sellerRouter.post("/registerSec/:id",sellerContr.registerSec)
sellerRouter.post("/login", sellerContr.login);
sellerRouter.get("/home", mid.verifyTokenSeller, sellerContr.getHome);
sellerRouter.put("/edit/:id", sellerContr.updateProfile);

module.exports = sellerRouter;
