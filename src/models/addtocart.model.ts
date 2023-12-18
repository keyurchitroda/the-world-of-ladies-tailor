import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "readymade",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const AddToCart =
  mongoose.models.addtocart || mongoose.model("addtocart", addToCartSchema);
export default AddToCart;
