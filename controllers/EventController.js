const eventSchema = require("../models/eventSchema");


const expoController ={

    
    // Create a new expo event
    createExpoEvent : async (req, res) => {
  try {
      const {
          title,
          date,
          location,
          description,
          theme,
          imageUrl,
          booths
        } = req.body;
        
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
}

}
module.exports =  expoController
