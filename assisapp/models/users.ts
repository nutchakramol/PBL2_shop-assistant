import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    full_name: { type: String },

    points: { type: Number, default: 0 },

    vouchers: [{ type: Schema.Types.ObjectId, ref: "voucher" }],
    coupons: [{ type: Schema.Types.ObjectId, ref: "coupon" }],

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
