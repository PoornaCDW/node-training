const express = require("express");
const router = express.Router();

const buddyController = require("../controllers/buddyController");

router.post("/addBuddy", buddyController.addBuddy);

router.put("/updateBuddy", buddyController.updateBuddy);

router.delete("/deleteBuddy", buddyController.deleteBuddy);

router.get("/listBuddy", buddyController.listBuddy);

router.get("/listAllBuddies", buddyController.listAllBuddies);

module.exports = router;