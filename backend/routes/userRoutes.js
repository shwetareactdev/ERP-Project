const express = require("express");
const router = express.Router();
// const auth = require("../middleware/authMiddleware"); // ✅ Fixed Import
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware"); // ✅ Fixed Import

const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");

const User = require("../models/User"); // ✅ FIXED: Import User Model

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/", getAllUsers); // This is required for "/api/users"


router.get("/", authMiddleware, isAdmin, getAllUsers); // Admin only access
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "✅ User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// ✅ Delete User API (Admin Access Required)
// router.delete("/:id", authMiddleware, async (req, res) => {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" }); // 🛑 Handle Case: User ID not found
//       }
//       res.json({ message: "✅ User deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// });
  

module.exports = router;
