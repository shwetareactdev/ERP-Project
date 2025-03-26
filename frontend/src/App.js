import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProduct from "./pages/EditProduct";
import ManageUsers from "./pages/ManageUsers";
// import UserDashboard from "./components/UserDashboard";
import UserDashboard from "./userdashboard/UserDashboard";
// import Order from "./userdashboard/Order";
import Cart from "./userdashboard/Cart";
import MyOrders from "./userdashboard/MyOrders";
import AdminOrders from "./components/AdminOrders";

const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
  
      {/* 🔹 Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="adminorder" element={<AdminOrders/>}></Route>
      </Route>
  
      {/* 🔹 User Routes */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        {/* <Route path="/order" element={<Order />} /> */}
        <Route path="/myorder" element={<MyOrders/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        
      </Route>
  
      {/* 🔥 Default Unauthorized Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  
  );
};

export default App;
