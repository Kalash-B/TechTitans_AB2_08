require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const farmerRoutes = require("./routes/farmerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/farmers", farmerRoutes);

// MongoDB Connection
if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Start the server only after MongoDB is connected
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });
