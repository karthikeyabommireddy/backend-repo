// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// POST /orders → Place new bulk order
router.post("/", async (req, res) => {
  const { buyer_name, contact, address, items } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        buyer_name,
        contact,
        address,
        items,
        status: "Pending"
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// GET /orders → Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// GET /orders/:id → Fetch single order by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// PUT /orders/:id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: parseInt(id) },
        data: { status },
      });
  
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });
  

module.exports = router;
