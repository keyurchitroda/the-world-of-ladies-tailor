import mongoose from "mongoose";

const customizeSizeSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "newcategory",
      required: true,
    },
    customize_size_name: {
      type: String,
      required: [true, "Please provide a size name"],
    },
    customize_size_short_name: {
      type: String,
      required: [true, "Please provide a size short name"],
    },
    customize_size_desc: {
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

const CustomizeSize =
  mongoose.models.customizesize ||
  mongoose.model("customizesize", customizeSizeSchema);
export default CustomizeSize;
