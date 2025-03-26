const express = require("express");
const router = express.Router();
const { getProducts, addProduct, deleteProduct, updateProduct } = require("../controllers/productController");

// Multer Configuration for File Upload
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getProducts); // Get all products
router.post("/", upload.single("image"), addProduct); // Add new product with image
router.delete("/:id", deleteProduct); // Delete product
router.put("/:id", updateProduct); // Update product
// router.put("/products/:id", upload.single("image"), updateProduct);


module.exports = router;
