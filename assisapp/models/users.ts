import { Schema, model, models } from "mongoose";

const UserCouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    collectedAt: {
      type: Date,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    full_name: { type: String },

    points: { type: Number, default: 0 },

    vouchers: {
      type: [UserCouponSchema],
      default: [],
    },
    coupons: {
      type: [UserCouponSchema],
      default: [],
    },

    visited_restaurants: [
      {
        restaurant_id: { type: Schema.Types.ObjectId, ref: "restaurants" },
        visit_count: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

export default models.users || model("users", UserSchema, "users");
