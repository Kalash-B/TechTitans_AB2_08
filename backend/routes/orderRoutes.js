const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product"); // Import Product model if needed
const router = express.Router();

// 📌 Place an Order
router.post("/place", async (req, res) => {
  try {
    console.log("🛒 Received order data:", req.body); // Debugging

    const { productId, customerId, customerName, address, paymentMethod } = req.body;

    if (!productId || !customerId || !customerName || !address || !paymentMethod) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    // ✅ Fetch Product Price from Database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    const newOrder = new Order({
      productId,
      customerId,
      customerName,
      address,
      paymentMethod,
      price: product.price, // ✅ Add price field
      status: "Pending", // ✅ Default status
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "❌ Server Error", error });
  }
});

// 📌 Get All Orders for Admin/Farmer
router.get("/", async (req, res) => {
  try {
    console.log("📦 Fetching all orders...");
    const orders = await Order.find().populate("productId customerId", "productName name email");
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "❌ Error fetching orders", error });
  }
});

// 📌 Get Orders by Customer ID
router.get("/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    console.log(`📦 Fetching orders for customer ID: ${customerId}`);
    
    const orders = await Order.find({ customerId }).populate("productId", "productName price category");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "❌ No orders found for this customer." });
    }

    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching customer orders:", error);
    res.status(500).json({ message: "❌ Error fetching customer orders", error });
  }
});

// 📌 Get Single Order by Order ID (For Tracking)
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("productId", "productName price category")
      .populate("customerId", "name email");

    if (!order) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("❌ Error fetching order:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// 📌 Update Order Status (Admin/Farmer)
router.put("/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Shipped", "Delivered"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `❌ Invalid status. Choose from: ${validStatuses.join(", ")}` });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "❌ Order not found." });
    }

    console.log(`✅ Order ${updatedOrder._id} updated to: ${status}`);
    res.json({ message: "✅ Order status updated!", updatedOrder });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    res.status(500).json({ message: "❌ Error updating order", error });
  }
});

module.exports = router;
