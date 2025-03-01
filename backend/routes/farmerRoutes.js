const express = require("express");
const router = express.Router();
const Farmer = require("../models/Farmer"); // Ensure this model exists

// GET all farmers
router.get("/", async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.json(farmers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/insert", async (req, res) => {
    try {
        const newFarmer = new Farmer({
          name: "John Doe",
          location: {
            type: "Point",
            coordinates: [78.9629, 20.5937], // Example coordinates (longitude, latitude)
          },
          produce: ["Wheat", "Corn"],
        });
    
        await newFarmer.save(); // Insert into database
    
        res.send("New Farmer Inserted Successfully!");
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error saving data");
      }
});

module.exports = router;
