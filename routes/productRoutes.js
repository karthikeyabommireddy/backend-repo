const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /products → fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany(); // ✅ fixed
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /products → Add new product
router.post("/", async (req, res) => {
    const { name, price, category } = req.body;
  
    try {
      const product = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
          category, // ✅ NEW
        },
      });
  
      res.status(201).json(product);
    } catch (err) {
      console.error("Error adding product:", err);
      res.status(500).json({ error: "Failed to add product" });
    }
  });
  
  // PUT /products/:id → Update product
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, price, category } = req.body;
  
    try {
      const updated = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name,
          price: parseFloat(price),
          category, // ✅ NEW
        },
      });
      res.json(updated);
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

// DELETE /products/:id → delete product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ // ✅ fixed
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});



module.exports = router;
