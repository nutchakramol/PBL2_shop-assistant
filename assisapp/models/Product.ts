import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema, "menu");

export default Product;