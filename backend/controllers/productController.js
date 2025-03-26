// // controllers/productController.js
// const Product = require('../models/Product');

// const getProducts = async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// };

// const addProduct = async (req, res) => {
//     const { name, price } = req.body;
//     const product = new Product({ name, price });
//     await product.save();
//     res.json({ message: 'Product added' });
// };

// module.exports = { getProducts, addProduct };



const Product = require("../models/productModel"); // प्रोडक्ट मॉडेल इम्पोर्ट करा
const path = require("path");


// 🔹 सर्व प्रोडक्ट्स मिळवण्यासाठी
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔹 नवीन प्रोडक्ट जोडण्यासाठी
// const addProduct = async (req, res) => {
//   try {
//     const { name, price, category } = req.body;
//     const product = new Product({ name, price, category });
//     await product.save();
//     res.status(201).json({ message: "Product added successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding product" });
//   }
// };

// 🔹 नवीन प्रोडक्ट जोडण्यासाठी
const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !category || !image) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newProduct = new Product({ name, price, category, image });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};
// 🔹 Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

//🔹 Update Product
const updateProduct = async (req, res) => {
  try {
    const { name, price, category ,image} = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, category,image }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct };



