const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Add to cart
router.post("/", async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find((item) => item.productId === product._id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ ...product, productId: product._id, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
});

// Remove from cart
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();
  }

  res.json(cart);
});

module.exports = router;
