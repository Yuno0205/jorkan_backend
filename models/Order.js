const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerInfo: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      phoneNumber: { type: String, required: true },
      name: { type: String, required: true, default: "Anonymous customer" },
      email: { type: String },
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: {
          type: Number,
          default: 1,
        },
        size: { type: String, required: true },
        color: { type: String, required: true },
        image: { type: String, required: true },
        title: { type: String, required: true },
        feature: { type: String },
      },
    ],
    total: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
