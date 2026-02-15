import mongoose, { Schema, models, model } from "mongoose";

const UserCouponSchema = new Schema(
  {
    code: { type: String, required: true }, // DISC10_A
    qty: { type: Number, default: 1 },      // มีกี่อัน
    nextAvailableAt: { type: Date },         // cooldown 5 ชม.
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    full_name: String,

    points: {
      type: Number,
      default: 0,
    },

    vouchers: {
      gift1: { type: Number, default: 0 },
      gift2: { type: Number, default: 0 },
      gift3: { type: Number, default: 0 },
      gift4: { type: Number, default: 0 },
    },

    coupons: {
      type: [UserCouponSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
