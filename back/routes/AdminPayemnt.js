const express = require("express");
const router = express.Router();
const { add } = require("../controllers/AdminPayment.js");
const { verify } = require("../controllers/AdminPayment.js");

router.post("/pay", add);
router.post("/pay/:id", verify);

module.exports = router;