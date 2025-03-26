import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa"; // Icon for file upload
import "./ProductForm.css"; // Import the CSS file

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/products");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">📦 Add New Product</h2>
      &nbsp;&nbsp;
      <button className="dashboard" onClick={() => navigate("/dashboard")}>📊 Dashboard</button>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Product Name</label>
          <input type="text" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Price</label>
          <input type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Category</label>
          <input type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="file-upload">
          <label className="file-label">
            <FaCloudUploadAlt size={20} />
            Upload Product Image
            <input type="file" onChange={handleImageChange} required />
          </label>
          {image && <p className="file-name">Selected: {image.name}</p>}
        </div>
        <button type="submit" className="submit-btn">➕ Add Product</button> 
      
       
      </form>
    </div>
  );
};

export default ProductForm;
