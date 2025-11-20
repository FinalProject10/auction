const express = require("express");
const router = express.Router();
const titleTransferController = require("../controllers/titleTransferController");

router.post("/initiate", titleTransferController.initiateTitleTransfer);
router.get("/status/:itemId", titleTransferController.getTitleTransferStatus);
router.put("/upload/:titleTransferId", titleTransferController.uploadTitleDocument);
router.put("/complete/:titleTransferId", titleTransferController.completeTitleTransfer);
router.get("/client/:clientId", titleTransferController.getClientTitleTransfers);

module.exports = router;

