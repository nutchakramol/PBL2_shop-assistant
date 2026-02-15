import { Schema, model, models } from "mongoose";

const CouponSchema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true
    },

    code: { type: String, required: true, unique: true },

    discount_type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true
    },

    discount_value: { type: Number, required: true },

    min_order_amount: { type: Number, default: 0 },
    max_discount: { type: Number },

    valid_from: Date,
    valid_until: Date,

    usage_limit: { type: Number },
    used_count: { type: Number, default: 0 },

    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default models.coupon || model("coupon", CouponSchema, "coupon");
