import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load Cart from LocalStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Fetch Products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Add to Cart Function (with localStorage update)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      console.log("Updated Cart:", updatedCart);  // 🔍 Debugging
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Update LocalStorage
      return updatedCart;
    });

    alert(`${product.name} added to cart!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Perform logout action
    // localStorage.removeItem("cart"); // Optionally clear cart data
    // Navigate to login or home page (depending on your app flow)
    window.location.href = '/login';
  };

  return (
    <div className="user-dashboard-container">
      <nav className="user-dashboard-navbar">
        <h2 className="user-dashboard-title">Shoppy</h2>
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
        {/* Mobile Menu Button */}
        {/* <button className="mobile-menu-btn" onClick={() => document.querySelector('.user-dashboard-buttons').classList.toggle('active')}>
          ☰
        </button> */}
      </nav>

      <div className="user-dashboard-product-list">
        {products.map((product) => (
          <div key={product._id} className="user-dashboard-product-card">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="user-dashboard-product-image"
            />
            <h3 className="user-dashboard-product-name">{product.name}</h3>
            <p className="user-dashboard-product-price">₹{product.price}</p>

            <button onClick={() => addToCart(product)} className="user-dashboard-add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
