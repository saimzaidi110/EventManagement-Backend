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
    },
    exhibitorRequest: async (req, res) => {
        const { expoId, username, email, companyName, productsServices, documents } = req.body;
        console.log(req.body)
        try {
            const expo = await eventSchema.findById(expoId);
            if (!expo) {
                return res.status(404).json({ message: 'Expo not found' });
            }
            expo.exhibitorRequests.push({ username, email, companyName, productsServices, documents });
            await expo.save();
            res.status(200).json({ message: 'Exhibitor request submitted successfully', status: true });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    },
     approveExhibitorRequest: async (req, res) => {
    const { expoId, exhibitorRequestId } = req.body;
  
    try {
      // Find the expo by ID
      const expo = await eventSchema.findById(expoId);
  
      if (!expo) {
        return res.status(404).json({ message: 'Expo not found' });
      }
  
      // Find the exhibitor request by requestId
      const exhibitorRequest = expo.exhibitorRequests.id(exhibitorRequestId);
  
      if (!exhibitorRequest) {
        return res.status(404).json({ message: 'Exhibitor request not found' });
      }
  
      // Add the exhibitor request to exhibitorList
      expo.exhibitorList.push(exhibitorRequest);
  
      // Remove the exhibitor request from exhibitorRequests
      expo.exhibitorRequests.pull(exhibitorRequestId);
  
      // Save the updated expo document
      await expo.save();
  
      return res.status(200).json({ message: 'Exhibitor approved successfully', expo });
    } catch (error) {
      console.error('Error approving exhibitor:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  rejectExhibitorRequest: async (req, res) => {
    const { expoId, exhibitorRequestId } = req.body;

    try {
        const expo = await eventSchema.findById(expoId);
        if (!expo) {
            return res.status(404).json({ status: false, message: 'Expo not found' });
        }

        // Filter out the rejected exhibitor request
        expo.exhibitorRequests = expo.exhibitorRequests.filter(
            (request) => request._id.toString() !== exhibitorRequestId
        );

        await expo.save();
        res.status(200).json({ status: true, message: 'Exhibitor request rejected successfully', expo });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error rejecting exhibitor request', error });
    }
}
};

module.exports = expoController;
