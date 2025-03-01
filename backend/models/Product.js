const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { type: String, required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the Farmer (User)
});

module.exports = mongoose.model("Product", ProductSchema);
