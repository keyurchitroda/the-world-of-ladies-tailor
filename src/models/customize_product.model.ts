import mongoose from "mongoose";

const customizeProductSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "newcategory",
      required: true,
    },
    customize_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customizecategory",
      required: true,
    },
    customize_product_name: {
      type: String,
      required: [true, "Please provide a product name"],
    },
    customize_product_desc: {
      type: String,
      required: [true, "Please provide a product description"],
    },
    customize_product_image: {
      type: String,
      required: [true, "Please provide a product image"],
    },
    customize_product_price: {
      type: String,
      required: [true, "Please provide a product price"],
    },
    isStockAvailable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CustomizeProduct =
  mongoose.models.customizeproduct ||
  mongoose.model("customizeproduct", customizeProductSchema);
export default CustomizeProduct;
