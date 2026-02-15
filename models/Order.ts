import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  menu_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    restaurant_id: {
      type: String,
      required: true,
      index: true, // important for faster filtering
    },
    table_id: {
      type: String,
      required: true,
    },
    table_number: {
      type: Number,
      required: true,
    },
    items: [OrderItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "served", "cancelled"],
      default: "pending",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema, "order");
