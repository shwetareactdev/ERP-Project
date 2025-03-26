import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not logged in!");
        setLoading(false);
        return;
      }

      let userId = null;
      try {
        const decoded = jwtDecode(token);
        console.log("🔹 Decoded Token:", decoded);

        if (decoded.id) {
          userId = decoded.id;
          console.log("✅ Extracted User ID:", userId);
        } else {
          console.error("❌ `id` missing in token:", decoded);
          setError("Invalid Token Structure! `id` not found.");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("❌ Invalid Token:", error);
        setError("Invalid Token!");
        setLoading(false);
        return;
      }

      console.log(`🔍 Fetching Orders for User ID: ${userId}`);
      const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      console.log("✅ Orders Fetched:", response.data);

      if (response.data.length === 0) {
        setError("No orders found.");
      }

      setOrders(response.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      setError("No orders found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-orders-container">
    <center> <a href="user-dashboard"><button className="Continue-shopping">Continue shopping</button></a></center>  &nbsp;&nbsp;
      <h2 className="my-orders-title">My Orders</h2>
     

      {loading ? (
        <p className="my-orders-loading">Loading...</p>
      ) : error ? (
        <p className="my-orders-error">{error}</p>
      ) : orders.length === 0 ? (
        <p className="my-orders-empty">No orders found.</p>
      ) : (
        <ul className="my-orders-list">
          {orders.map((order) => (
            <li key={order._id} className="my-orders-card">
              <h3 className="order-id">Order ID: {order._id}</h3>
              <p className="order-status">Status: {order.status}</p>
              <p className="order-date">Ordered On: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="order-price">Total Price: ₹{order.totalPrice}</p>
              <h4>Items:</h4>
              <ul className="order-items">
                {order.cart.map((item, index) => (
                  <li key={index}>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
