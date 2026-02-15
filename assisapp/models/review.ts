import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true
    },

    order_id: {
      type: Schema.Types.ObjectId,
      ref: "order"
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    comment: { type: String }
  },
  { timestamps: true }
);

export default models.review || model("review", ReviewSchema, "review");
