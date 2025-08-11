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

// exhibitor  request for event
router.post('/exporegisterrequest', expoController.exhibitorRequest)


// http://localhost:3000/api/expo/approve-exhibitor
router.post('/approve-exhibitor',expoController.approveExhibitorRequest)

// http://localhost:3000/api/expo/reject-exhibitor
router.post('/reject-exhibitor',expoController.rejectExhibitorRequest)

module.exports = router;
