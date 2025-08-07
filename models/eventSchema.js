// models/ExpoEvent.js

const mongoose = require('mongoose');

const expoEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Expo'
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    default: 'TBD'
  },
  description: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'General'
  },
  imageUrl: {
    type: String,
    default: 'https://example.com/default-expo.jpg'
  },
  booths: {
    type: Number,
    default:10,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update timestamp
expoEventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ExpoEvent', expoEventSchema);
