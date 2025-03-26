// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   cart: [
//     {
//       name: String,
//       price: Number,
//       category: String,
//       image: String,
//       quantity: Number
//     }
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;



// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   //  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // ✅ userId added
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } ,// required: true हटवा

//   cart: [
//     {
//       name: String,
//       price: Number,
//       category: String,
//       image: String,
//       quantity: Number,
//     },
//   ],
//   totalPrice: Number,
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;





// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User", 
//     required: true 
//   },
//   cart: [
//     {
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//       category: { type: String, required: true },
//       image: { type: String, required: true },
//       quantity: { type: Number, required: true, min: 1 },
//     },
//   ],
//   totalPrice: { type: Number, required: true, min: 0 },
//   status: { 
//     type: String, 
//     enum: ["Pending", "Shipped", "Delivered"], 
//     default: "Pending" 
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;




const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String }, // For background or product images
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
