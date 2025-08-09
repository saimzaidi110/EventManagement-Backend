const express = require("express");
const expoController = require("../controllers/EventController");
const router = express.Router();

// Get all
router.get("/", expoController.getAllExpoEvents);

// Get single
router.get("/:id", expoController.getSingleExpoEvent);

// Create
router.post("/", expoController.createExpoEvent);

// Update
router.put("/:id", expoController.updateExpoEvent);

// Delete
router.delete("/:id", expoController.deleteExpoEvent);

module.exports = router;
