const express = require("express");
const Farmer = require("../models/farmerModel");

const router = express.Router();

// Get Nearby Farmers
router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const farmers = await Farmer.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 5000 // 5 km
        }
      }
    });

    res.json(farmers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching farmers" });
  }
});

// Add a Farmer (For Testing)
router.post("/add", async (req, res) => {
  const { name, lat, lng, produce } = req.body;

  const newFarmer = new Farmer({
    name,
    location: { type: "Point", coordinates: [lng, lat] },
    produce
  });

  try {
    await newFarmer.save();
    res.status(201).json({ message: "Farmer added!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding farmer" });
  }
});

module.exports = router;
