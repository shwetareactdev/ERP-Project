const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
// backend/routes/orderRoutes.js



const router = express.Router();

// ✅ Create Order API
router.post("/", async (req, res) => {
  console.log("Incoming Order Request:", req.body);

  const { userId, cart } = req.body;

  if (!userId) return res.status(400).json({ message: "User ID is required!" });
  if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid userId format!" });
  if (!cart || cart.length === 0) return res.status(400).json({ message: "Cart is empty!" });

  try {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const formattedCart = cart.map(item => ({
      productId: new mongoose.Types.ObjectId(item.productId), // Ensure ObjectId
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const order = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      cart: formattedCart,
      totalPrice,
    });

    await order.save();

    console.log("✅ Order placed successfully!", order);
    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("❌ Order Save Error:", error);
    res.status(500).json({ message: "Server error. Try again!", error });
  }
});

// ✅ Get Orders for a specific User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate("cart.productId", "name price image") // Populate product details
      .populate("userId", "email");

    if (!orders.length) return res.status(404).json({ message: "No orders found" });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all orders (Admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("cart.productId", "name price image") // Populate product details
      .populate("userId", "name email"); // Fetch user details

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



// ✅ Update Order Status (Admin Only)
router.put("/update-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value!" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found!" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully!", order });
  } catch (error) {
    console.error("❌ Order Status Update Error:", error);
    res.status(500).json({ message: "Server error. Try again!", error });
  }
});


module.exports = router;
