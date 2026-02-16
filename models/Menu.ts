import mongoose, { Schema, models, model } from "mongoose";

const MenuSchema = new Schema(
  {
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Curry", "Noodle", "Drinks", "Rice", "Dessert"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      default: "", // optional
    },

    is_available: {
      type: Boolean,
      default: true, // IMPORTANT: auto true when created
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Menu = models.Menu || model("Menu", MenuSchema, "menu");

export default Menu;