// import React, { useEffect, useState } from "react";
// import { api } from "../api/api";
// import { Link } from "react-router-dom";
// import "./ProductList.css"; // Import CSS
// import { useNavigate } from "react-router-dom";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await api.get("/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await api.delete(`/products/${id}`);
//         alert("Product deleted successfully!");
//         fetchProducts();
//       } catch (error) {
//         alert("Error deleting product");
//       }
//     }
//   };

//   return (
//     <div className="product-list-container">
//       <h2 className="product-list-title">Product Management</h2>
//       <button className="dashboard" onClick={() => navigate("/dashboard")}>📊 Dashboard</button>
//       &nbsp;&nbsp;
//       <Link to="/add-product" className="add-product-btn">+ Add Product</Link>

//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />
//             <h3 className="product-name">{product.name}</h3>
//             <p className="product-price">₹{product.price}</p>
//             <p className="product-category">{product.category}</p>
//             <div className="product-actions">
//               <Link to={`/edit-product/${product._id}`} className="edit-btn">Edit</Link>
//               <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;



import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", price: "", category: "" });
  const navigate = useNavigate();
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

  // Open Edit Mode
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
      await api.put(`/products/${id}`, editedData, {
        headers: { "Content-Type": "application/json" }
      });

      // Update State without Reloading
      setProducts(products.map(prod => prod._id === id ? { ...prod, ...editedData } : prod));
      
      alert("Product updated successfully!");
      setEditingProduct(null);
    } catch (error) {
      alert("Error updating product");
    }
  };
// Delete data
   const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          try {
            await api.delete(`/products/${id}`);
            alert("Product deleted successfully!");
            fetchProducts();
          } catch (error) {
            alert("Error deleting product");
           }
         }
       };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product Management</h2>
   <button className="dashboard" onClick={() => navigate("/dashboard")}>📊 Dashboard</button>
   &nbsp;&nbsp;
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
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                  {/* <button onClick={() => alert("Delete functionality here")} className="delete-btn">Delete</button> */}
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

