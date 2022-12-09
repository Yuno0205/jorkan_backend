const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    imageMain: { type: Array, required: true },
    imageExtra: { type: Array, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    fullPrice: { type: Number },
    inOnSale: { type: Boolean, required: true, default: false },
    gender: { type: Array, required: true },
    skuData: [
      {
        size: { type: Number, required: true },
        inStock: { type: Boolean, required: true, default: true },
      },
    ],
    discount: { type: Number, default: 0 },
    feature: { type: String },
    subCategory: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
