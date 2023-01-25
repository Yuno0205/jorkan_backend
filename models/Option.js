const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageMain: { type: Array, required: true },
    imageExtra: { type: Array, required: true },
    color: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    fullPrice: { type: Number },
    inOnSale: { type: Boolean, required: true, default: false },
    skuData: [
      {
        size: { type: Number, required: true },
        inStock: { type: Boolean, required: true, default: true },
      },
    ],
    discount: { type: Number, default: 0 },
    feature: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Option", OptionSchema);
