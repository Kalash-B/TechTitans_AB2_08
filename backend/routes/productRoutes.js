const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const router = express.Router();

// Set up image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 📌 Add Product (Farmer posts product)
router.post("/add", upload.single("image"), async (req, res) => {
  console.log("Received Data:", req.body);
  console.log("Received File:", req.file);

  const { productName, description, price, discount, category, farmerId } = req.body;

  if (!productName || !description || !price || !category || !farmerId || !req.file) {
    return res.status(400).json({
      message: "All fields are required",
      missingFields: {
        productName,
        description,
        price,
        category,
        farmerId,
        image: req.file ? "Exists" : "Missing",
      },
    });
  }

  const product = new Product({
    farmerId,
    image: `/uploads/${req.file.filename}`,
    productName,
    description,
    price,
    discount,
    category,
  });

  await product.save();
  res.status(201).json({ message: "Product added successfully!", product });
});

// 📌 Get products sorted by category
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    let query = {};

    if (category) {
      query.category = category; // Filter by category if provided
    }

    const products = await Product.find(query).populate("farmerId", "name email").sort({ category: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
