const sellerRouter = require("express").Router();
const sellerContr = require("../controllers/seller");
const mid = require("../middleware/middleware");

sellerRouter.post("/register", sellerContr.register);
sellerRouter.post("/login", sellerContr.login);
sellerRouter.get("/home", mid.verifyTokenSeller, sellerContr.getHome);
sellerRouter.put("/edit/:id", sellerContr.updateProfile);

module.exports = sellerRouter;
