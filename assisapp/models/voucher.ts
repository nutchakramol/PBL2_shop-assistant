import { Schema, model, models } from "mongoose";

const VoucherSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    value: { type: Number, required: true },

    status: {
      type: String,
      enum: ["unused", "used", "expired"],
      default: "unused"
    },

    expired_at: Date
  },
  { timestamps: true }
);

export default models.voucher || model("voucher", VoucherSchema, "voucher");
