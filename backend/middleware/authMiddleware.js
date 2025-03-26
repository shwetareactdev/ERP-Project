const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    console.log("🔹 Token Received in Backend:", token); // ✅ Debugging Token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("✅ Decoded User:", decoded); // 🔹 Debugging User Info

        next();
    } catch (error) {
        console.error("❌ Invalid Token!", error);
        res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }
};

const isAdmin = (req, res, next) => {
    console.log("🔹 User Role in Middleware:", req.user?.role); // ✅ Debugging Role

    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access Denied: Admins Only" });
    }
};

module.exports = { authMiddleware, isAdmin };
