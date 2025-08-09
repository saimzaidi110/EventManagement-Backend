const eventSchema = require("../models/eventSchema");

// Create and Get all Expo Events
const expoController = {
    createExpoEvent: async (req, res) => {
        try {
            const { title, date, location, description, theme, imageUrl, booths } = req.body;

            const newExpo = new eventSchema({
                title,
                date,
                location,
                description,
                theme,
                imageUrl,
                booths
            });

            const savedExpo = await newExpo.save();
            res.status(201).json({ message: 'Expo created successfully', expo: savedExpo });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create expo', error: error.message });
        }
    },

    // ✅ Get All
    getAllExpoEvents: async (req, res) => {
        try {
            const expos = await eventSchema.find().sort({ date: 1 });
            res.status(200).json(expos);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch expos', error: error.message });
        }
    },

    // ✅ Get Single
    getSingleExpoEvent: async (req, res) => {
        try {
            const expo = await eventSchema.findById(req.params.id);
            if (!expo) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(expo);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch event", error: error.message });
        }
    },

    // Delete
    deleteExpoEvent: async (req, res) => {
        try {
            await eventSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete event", error: error.message });
        }
    },

    // Update
    updateExpoEvent: async (req, res) => {
        try {
            const updated = await eventSchema.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.status(200).json({ message: "Event updated successfully", event: updated });
        } catch (error) {
            res.status(500).json({ message: "Failed to update event", error: error.message });
        }
    }
};

module.exports = expoController;
