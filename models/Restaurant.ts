import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  restaurant_id: {
    type: String,
    required: true,
    unique: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tableCount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Restaurant ||
  mongoose.model("Restaurant", RestaurantSchema, "restaurant_register");
