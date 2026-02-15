import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },

    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true
    },

    table_id: {
      type: Schema.Types.ObjectId,
      ref: "tables",
      required: true
    },

    table_number: Number,

    items: [
      {
        menu_id: {
          type: Schema.Types.ObjectId,
          ref: "menu"
        },
        name: String,
        price: Number,
        quantity: Number,
        total: Number
      }
    ],

    subtotal: Number,
    discount: { type: Number, default: 0 },
    total_price: Number,

    coupon_id: {
      type: Schema.Types.ObjectId,
      ref: "coupon"
    },

    voucher_id: {
      type: Schema.Types.ObjectId,
      ref: "voucher"
    },

    points_earned: { type: Number, default: 0 },

    qr_code: String,

    status: {
      type: String,
      enum: ["pending", "preparing", "served", "paid", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default models.order || model("order", OrderSchema, "order");
