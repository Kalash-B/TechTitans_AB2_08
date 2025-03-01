require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const farmerRoutes = require("./routes/farmerRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/farmers", farmerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Failed:", err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
