import { Schema, model, models } from "mongoose";

const TableSchema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true
    },

    table_number: { type: Number, required: true },

    qr_code: { type: String },

    status: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      default: "available"
    }
  },
  { timestamps: true }
);

export default models.tables || model("tables", TableSchema, "tables");
