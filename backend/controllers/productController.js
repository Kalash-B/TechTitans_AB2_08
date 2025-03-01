const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const { productName, description, price, discount, category, farmerId } = req.body;

    // Ensure all required fields are present
    if (!productName || !description || !price || !category || !req.file || !farmerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Extract image URL
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    // Create new product
    const newProduct = new Product({
      productName,
      description,
      price,
      discount,
      category,
      image: imageUrl,
      farmerId, // Store the farmer's ID
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addProduct };
