import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, "Please provide a category"],
    },
    category_image: {
      type: String,
      required: [true, "Please provide a category image"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.newcategory || mongoose.model("newcategory", categorySchema);
export default Category;
