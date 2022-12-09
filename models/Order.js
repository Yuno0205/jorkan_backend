const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerInfo: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        phone: { type: String, required: true },
      },
    ],
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
