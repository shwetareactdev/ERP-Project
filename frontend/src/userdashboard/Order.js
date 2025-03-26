import React from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  const handleOrder = () => {
    alert("Order Placed Successfully!");

    // 🔹 Existing Orders Get करून नवीन Order Add करा
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      date: new Date().toLocaleString(),
    };

    // 🔹 Orders LocalStorage मध्ये Save करा
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    // 🔹 Cart Clear करून "My Orders" Page वर Redirect
    localStorage.removeItem("cart");
    navigate("/myorder");
  };

  return (
    <div className="order-page">
      <h2>Order Confirmation</h2>
      <p>Review your order and proceed to checkout.</p>
      <button className="confirm-btn" onClick={handleOrder}>Confirm Order</button>
    </div>
  );
};

export default Order;
