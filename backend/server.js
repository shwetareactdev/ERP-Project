// // server.js
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require("./routes/orderRoutes.js");
// const User = require("./models/User"); // User Model Import कर
// const bcrypt = require("bcryptjs"); // Password Hashing साठी
// const connectDB = require("./config/db"); // Make sure to import this
// connectDB();



// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());// JSON Data Accept करेल

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);// ✅ प्रोडक्ट रूट जोडला
// app.use("/api/orders", orderRoutes);
// app.use("/api/cart", require("./routes/cartRoutes"));



// console.log("🔹 ENV LOADED: JWT_SECRET =", process.env.JWT_SECRET);
// console.log("🔹 ENV LOADED: MONGO_URI =", process.env.MONGO_URI);


// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads")); // Image Access साठी
// app.use("/uploads", express.static("uploads"));


// async function createAdminUser() {
//     const existingAdmin = await User.findOne({ email: "admin@example.com" });
  
//     if (existingAdmin) {
//       console.log("⚠️ Admin User Already Exists!");
//       mongoose.connection.close();
//       return;
//     }
  
//     const hashedPassword = await bcrypt.hash("admin123", 10); // Password Hash
  
//     const adminUser = new User({
//       name: "Admin",
//       email: "admin@example.com",
//       password: hashedPassword,
//       role: "admin"
//     });
  
//     await adminUser.save();
//     console.log("✅ Admin User Created Successfully!");
//     mongoose.connection.close();
//   }
  
//   createAdminUser();



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const User = require("./models/User");

dotenv.config();
connectDB(); // ✅ MongoDB कनेक्ट कर

const app = express();
app.use(cors());
app.use(express.json()); // JSON Data Accept करेल
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Image Access साठी

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Environment Variables Print
console.log("🔹 ENV LOADED: JWT_SECRET =", process.env.JWT_SECRET);
console.log("🔹 ENV LOADED: MONGO_URI =", process.env.MONGO_URI);

// Admin User Check and Create
async function createAdminUser() {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
        console.log("⚠️ Admin User Already Exists!");
        return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = new User({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
    });

    await adminUser.save();
    console.log("✅ Admin User Created Successfully!");
}
createAdminUser();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
