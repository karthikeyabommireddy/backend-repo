// server/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // ⬅️ Replaces body-parser (recommended)

// Test route
app.get("/", (req, res) => {
  res.send("Agrofix API is working!");
});

// Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/products", productRoutes);  // ✅ All /products routes
app.use("/orders", orderRoutes);      // ✅ All /orders routes

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
