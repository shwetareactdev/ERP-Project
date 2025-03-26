import React, { useState, useEffect } from "react";
import { api } from "../api/api"; // Ensure API base URL is correct
import "./AdminOrders.css";
import { useNavigate } from "react-router-dom";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders();
  }, []); // ✅ Only fetch on component mount

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      console.log("Fetched Orders:", response.data); // Debugging
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await api.put(`/orders/update-status/${id}`, { status: newStatus });
      console.log("Updated Order Response:", response.data); // Debugging

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <div className="admin-orders-container">
          <button className="dashboard" onClick={() => navigate("/dashboard")}>📊 Dashboard</button>

      <h2>Admin Panel - Manage Orders</h2>
      <table className="admin-orders-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td data-label="User Email">{order.userId && order.userId.email ? order.userId.email : "No Email"}</td>
              <td data-label="Items">
                {order.cart.map((item, index) => (
                  <p key={index}>
                    {item.productId} - ₹{item.price} x {item.quantity}
                  </p>
                ))}
              </td>
              <td data-label="Total Price">₹{order.totalPrice}</td>
              <td data-label="Status">{order.status}</td>
              <td data-label="Update">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
