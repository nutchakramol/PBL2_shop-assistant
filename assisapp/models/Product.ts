import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Important: Next.js re-runs this code often. 
// "models.Product" checks if the model already exists before creating a new one.
const Product = models.Product || model("Product", ProductSchema);

export default Product;