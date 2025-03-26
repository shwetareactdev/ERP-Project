const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true } // Image URL Store करणार
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
