import { Schema, model, models } from "mongoose";

const MenuSchema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true
    },

    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },

    price: { type: Number, required: true },

    is_available: { type: Boolean, default: true },

    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default models.menu || model("menu", MenuSchema, "menu");
