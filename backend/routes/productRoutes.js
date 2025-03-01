const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const router = express.Router();

// Set up image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// 📌 Add Product (Farmer posts product)
router.post("/add", upload.single("image"), async (req, res) => {
    try {
      console.log("Received Request Data:", req.body);
      console.log("Received File:", req.file);
  
      const { productName, description, price, discount, category, farmerId } = req.body;
  
      // ✅ Log Missing Fields
      let missingFields = {};
      if (!farmerId) missingFields.farmerId = "Missing";
      if (!productName) missingFields.productName = "Missing";
      if (!description) missingFields.description = "Missing";
      if (!price) missingFields.price = "Missing";
      if (!category) missingFields.category = "Missing";
      if (!req.file) missingFields.image = "Missing";
  
      if (Object.keys(missingFields).length > 0) {
        return res.status(400).json({ message: "All fields are required", missingFields });
      }
  
      // Proceed with product saving...
      const product = new Product({
        farmerId,
        image: `/uploads/${req.file.filename}`,
        productName,
        description,
        price,
        discount,
        category
      });
  
      await product.save();
      res.status(201).json({ message: "Product added successfully!", product });
  
    } catch (error) {
      console.error("Error in addProduct:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  

// 📌 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("farmerId", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
