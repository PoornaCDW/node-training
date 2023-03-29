const express = require("express");
const router = express.Router();

const putBuddyController = require("../controllers/buddyControllers/putBuddyController");
const deleteBuddyController = require("../controllers/buddyControllers/deleteBuddyController");
const getBuddyController = require("../controllers/buddyControllers/getBuddyController");
const postBuddyController = require("../controllers/buddyControllers/postBuddyController");

router.post("/addBuddy", postBuddyController.addBuddy);

router.put("/updateBuddy", putBuddyController.updateBuddy);

router.delete("/deleteBuddy", deleteBuddyController.deleteBuddy);

router.get("/listBuddy", getBuddyController.listBuddy);

router.get("/listAllBuddies", getBuddyController.listAllBuddies);

module.exports = router;