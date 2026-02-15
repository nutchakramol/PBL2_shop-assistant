import { Schema, model, models } from "mongoose";

const RestaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },

    owner: {
      owner_name: String,
      owner_email: String
    },

    location: {
      address: String,
      lat: Number,
      lng: Number
    },

    tables_available: { type: Number, default: 0 },

    image: { type: String },

    rating: {
      average: { type: Number, default: 0 },
      total_reviews: { type: Number, default: 0 }
    },

    total_orders: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default models.restaurants || model("restaurants", RestaurantSchema, "restaurants");
