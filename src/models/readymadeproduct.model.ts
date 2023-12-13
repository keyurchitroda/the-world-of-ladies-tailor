import mongoose from "mongoose";

const readymadeProductSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "newcategory",
      required: true,
    },
    product_name: {
      type: String,
      required: [true, "Please provide a product name"],
    },
    product_desc: {
      type: String,
      required: [true, "Please provide a product description"],
    },
    product_image: [
      {
        type: String,
        required: [true, "Please provide a product image"],
      },
    ],
    product_price: {
      type: String,
      required: [true, "Please provide a product price"],
    },
    isStockAvailable: {
      type: Boolean,
      default: true,
    },
    product_available_qty: {
      type: Number,
      required: [true, "Please provide a product quantity"],
    },
    product_size: {
      type: String,
      required: [true, "Please provide a product quantity"],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ReadymadeProduct =
  mongoose.models.readymade ||
  mongoose.model("readymade", readymadeProductSchema);
export default ReadymadeProduct;
