import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  restaurant_Id: {
    type: String,
    unique: true,
  },
  ownerName: String,
  restaurantLocation: String,
  tableCount: Number,
});

// 👇 Force collection name here
export default mongoose.models.Restaurant ||
  mongoose.model("Restaurant", RestaurantSchema, "restaurant_register");
