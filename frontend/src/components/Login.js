import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
  
      // Backend response मध्ये token आणि role मिळेल असे गृहीत धरतो
      const { token, role } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
  
      if (role === "admin") {
        navigate("/dashboard"); // Admin साठी वेगळा डॅशबोर्ड
      } else {
        navigate("/user-dashboard"); // सामान्य वापरकर्त्यासाठी वेगळा पेज
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="company-name"> ATHARV GROUP ERP SYSTEM</h1>
        <h2>Login Form</h2> <FaUserShield className="login-icon" />
       
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="extra-options">
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          <p>Not an account? <a href="/register" className="register-link">Register</a></p>
        </div>

        <div className="contact-info">
          <p>📞 Support: +91 9876543210</p>
          <p>📧 Email: support@atharvgroup.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
