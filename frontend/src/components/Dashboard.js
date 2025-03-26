
// import React, { useState, useEffect } from "react";
// import { api } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { FaSignOutAlt, FaUser, FaBox, FaHome, FaClipboardList } from "react-icons/fa";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [usersCount, setUsersCount] = useState(0);
//   const [productsCount, setProductsCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           navigate("/");
//           return;
//         }

//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const users = await api.get("http://localhost:5000/api/users", config);
//         const products = await api.get("http://localhost:5000/api/products", config);

//         setUsersCount(users.data.length);
//         setProductsCount(products.data.length);
//       } catch (error) {
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const data = [
//     { name: "Users", count: usersCount },
//     { name: "Products", count: productsCount },
//   ];

//   const colors = ["#4caf50", "#2196f3"];

//   return (
//     <div className="dashboard-wrapper">
//       <div className="sidebar">
//         <h2 className="sidebar-title" style={{ color: "white" }}>ERP Dashboard</h2>
//         <ul className="sidebar-menu">
//           <li onClick={() => navigate("/")}><FaHome /> Home</li>
//           <li onClick={() => navigate("/products")}><FaBox /> Manage Products</li>
//           <li onClick={() => navigate("/add-product")}><FaClipboardList /> Add Products</li>
//           <li onClick={() => navigate("/manage-users")}><FaUser /> Manage Users</li>
//           <li onClick={() => navigate("/adminorder")}><FaUser /> Manage Orders</li>
//           <li className="logout-btn" onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </li>
//         </ul>
//       </div>

//       <div className="dashboard-container">
//         {loading ? (
//           <p>Loading data...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : (
//           <>
//             <div className="stats-section">
//               <div className="stat-card users">
//                 <FaUser className="card-icon" />
//                 <h3>Users</h3>
//                 <p>{usersCount}</p>
//               </div>
//               <div className="stat-card products">
//                 <FaBox className="card-icon" />
//                 <h3>Products</h3>
//                 <p>{productsCount}</p>
//               </div>
//             </div>

//             <div className="charts-container">
//               <ResponsiveContainer width="45%" height={300}>
//                 <LineChart data={data}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="count" stroke="#4caf50" strokeWidth={3} />
//                 </LineChart>
//               </ResponsiveContainer>

//               <ResponsiveContainer width="45%" height={300}>
//                 <PieChart>
//                   <Pie data={data} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
//                     {data.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={colors[index]} />
//                     ))}
//                   </Pie>
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaSignOutAlt, FaUser, FaBox, FaHome, FaClipboardList } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // To manage sidebar open/close
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const users = await api.get("http://localhost:5000/api/users", config);
        const products = await api.get("http://localhost:5000/api/products", config);
        const orders = await api.get("http://localhost:5000/api/orders", config);

        setUsersCount(users.data.length);
        setProductsCount(products.data.length);
        setOrdersCount(orders.data.length); 
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const data = [
    { name: "Users", count: usersCount },
    { name: "Products", count: productsCount },
    { name: "Orders", count: ordersCount },
  ];

  const colors = ["#4caf50", "#2196f3", "#ff9800"];

  return (
    <div className={`dashboard-wrapper ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
    
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">ERP Dashboard</h2>
          {/* <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? "Close" : "Open"} Sidebar
          </button> */}
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}><FaHome /> Home</li>
          <li onClick={() => navigate("/products")}><FaBox /> Manage Products</li>
          <li onClick={() => navigate("/add-product")}><FaClipboardList /> Add Products</li>
          <li onClick={() => navigate("/manage-users")}><FaUser /> Manage Users</li>
          <li onClick={() => navigate("/adminorder")}><FaClipboardList /> Manage Orders</li>
          <li className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-container">
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="stats-section">
              <div className="stat-card users">
                <FaUser className="card-icon" />
                <h3>Users</h3>
               <p>{usersCount}</p>
              </div>
              <div className="stat-card products">
                <FaBox className="card-icon" />
                <h3>Products</h3>
                <p>{productsCount}</p>
              </div>
              <div className="stat-card orders">
                <FaClipboardList className="card-icon" />
                <h3>Orders</h3>
                <p>{ordersCount}</p>
              </div>
            </div>

            <div className="charts-container">
              {/* LineChart */}
              <ResponsiveContainer width="45%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#4caf50" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>

              {/* PieChart */}
              <ResponsiveContainer width="45%" height={300}>
                <PieChart>
                  <Pie data={data} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


