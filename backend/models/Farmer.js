const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number] // [longitude, latitude]
  },
  produce: [String]
});

farmerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Farmer", farmerSchema);
