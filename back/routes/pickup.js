const express = require("express");
const router = express.Router();
const pickupController = require("../controllers/pickupController");

router.post("/schedule", pickupController.schedulePickup);
router.get("/pending/:clientId", pickupController.getPendingPickups);
router.post("/confirm/:pickupId", pickupController.confirmPickup);

module.exports = router;

