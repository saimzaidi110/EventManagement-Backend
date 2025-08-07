const expoController = require('../controllers/EventController');
const express = require('express');
const router = express.Router();

// Create Expo Event
router.post('/', expoController.createExpoEvent);

module.exports = router;
