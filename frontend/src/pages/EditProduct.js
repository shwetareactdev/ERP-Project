import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import "./EditProduct.css"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", price: "", category: "" });

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

  // Open Edit Modal
  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditedData({ name: product.name, price: product.price, category: product.category });
  };

  // Update Form Fields
  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  // Save Update
  const handleUpdate = async (id) => {
    try {
      await api.put(`/products/${id}`, editedData);
      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert("Error updating product");
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product Management</h2>
      <Link to="/add-product" className="add-product-btn">+ Add Product</Link>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />
            {editingProduct === product._id ? (
              <div className="edit-form">
                <input type="text" name="name" value={editedData.name} onChange={handleChange} />
                <input type="number" name="price" value={editedData.price} onChange={handleChange} />
                <input type="text" name="category" value={editedData.category} onChange={handleChange} />
                <button onClick={() => handleUpdate(product._id)} className="save-btn">Save</button>&nbsp;
                <button onClick={() => setEditingProduct(null)} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <p className="product-category">{product.category}</p>
                <div className="product-actions">
                  <button onClick={() => handleEditClick(product)} className="edit-btn">Edit</button>
                  <button onClick={() => alert("Delete functionality here")} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
