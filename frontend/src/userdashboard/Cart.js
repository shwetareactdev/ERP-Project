// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     console.log("Stored Cart:", storedCart);  // 🔍 Debugging  
//     setCart(storedCart);
//   }, []);

//   const increaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item._id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeFromCart = (id) => {
//     const updatedCart = cart.filter((item) => item._id !== id);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   const placeOrder = async (event) => {
//     event.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("❌ User not logged in!");
//       return;
//     }

//     const decodedToken = jwtDecode(token);
//     const userId = decodedToken?.id;

//     if (!userId) {
//       console.error("❌ userId Missing in Token!");
//       return;
//     }

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

//     if (storedCart.length === 0) {
//       console.error("❌ Cart is empty!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/orders",
//         { userId, cart: storedCart },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("✅ Order Placed Successfully:", res.data);
//       alert("Order Placed Successfully!");
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/myorder");
//     } catch (error) {
//       console.error("❌ Order Placement Error:", error);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty!</p>
//       ) : (
//         <>
//           <div className="cart-items">
//             {cart.map((item) => (
//               <div key={item._id} className="cart-item">
//                 <img
//                   src={`http://localhost:5000${item.image}`}
//                   alt={item.name}
//                   className="cart-image"
//                 />
//                 <div className="cart-details">
//                   <h3>{item.name}</h3>
//                   <p>₹{item.price}</p>
//                   <div className="cart-quantity">
//                     <button onClick={() => decreaseQuantity(item._id)}>-</button>
//                     <span>{item.quantity}</span>
//                     <button onClick={() => increaseQuantity(item._id)}>+</button>
//                   </div>
//                   <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <h3>Total: ₹{totalPrice}</h3>
//           <button onClick={(e) => placeOrder(e)} className="place-order-btn">
//             Place Order
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Stored Cart:", storedCart);  // Debugging  
    setCart(storedCart);
  }, []);
  
  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity is 0
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ User not logged in!");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.id;

    if (!userId) {
      console.error("❌ userId Missing in Token!");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedCart.length === 0) {
      console.error("❌ Cart is empty!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        { userId, cart: storedCart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Order Placed Successfully:", res.data);
      alert("Order Placed Successfully!");
      localStorage.removeItem("cart");
      setCart([]); // Clear the cart in the state
      navigate("/myorder");
    } catch (error) {
      console.error("❌ Order Placement Error:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <a href="user-dashboard"><button className="Continue-shopping">Continue shopping</button></a> &nbsp;&nbsp;
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
        
      ) : (
        
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <div className="cart-quantity">
                    <button onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: ₹{totalPrice}</h3>
          <button onClick={(e) => placeOrder(e)} className="place-order-btn">
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
