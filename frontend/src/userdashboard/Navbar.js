import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS for styling

const Navbar = ({ cart, handleLogout }) => {
  return (
    <nav className="user-dashboard-navbar">
      <h2 className="user-dashboard-title">Tech Store</h2>
      {/* Cart and My Orders Links with Icons */}
      <div className="user-dashboard-buttons">
        <Link to="/cart" className="user-dashboard-cart-btn">
          🛒 {cart.reduce((total, item) => total + item.quantity, 0)} Cart
        </Link>
        <Link to="/myorder" className="user-dashboard-cart-btn">
          📦 My Orders
        </Link>
        <button onClick={handleLogout} className="user-dashboard-logout-btn">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
