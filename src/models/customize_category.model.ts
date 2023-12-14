import mongoose from "mongoose";

const customizeCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "newcategory",
      required: true,
    },
    customize_category_name: {
      type: String,
      required: [true, "Please provide a product name"],
    },
    customize_category_desc: {
      type: String,
      required: [true, "Please provide a product description"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CustomizeCategory =
  mongoose.models.customizecategory ||
  mongoose.model("customizecategory", customizeCategorySchema);
export default CustomizeCategory;
