import mongoose from "mongoose";

const customizeProductDetailSchema = new mongoose.Schema(
  {
    products: [
      [
        {
          _id: {
            type: String,
          },
          category_id: {
            _id: {
              type: String,
            },
            category_name: {
              type: String,
            },
            category_image: {
              type: String,
            },
            status: {
              type: Boolean,
            },
          },
          customize_category_id: {
            _id: {
              type: String,
            },
            category_id: {
              type: String,
            },
            customize_category_name: {
              type: String,
            },
            customize_category_desc: {
              type: String,
            },
            status: true,
          },
          customize_product_name: {
            type: String,
          },
          customize_product_desc: {
            type: String,
          },
          customize_product_image: {
            type: String,
          },
          customize_product_price: {
            type: String,
          },
          isStockAvailable: {
            type: String,
          },
          status: {
            type: Boolean,
          },
        },
      ],
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CustomizeProductDetailSchema =
  mongoose.models.cutomizeproductdetail ||
  mongoose.model("cutomizeproductdetail", customizeProductDetailSchema);
export default CustomizeProductDetailSchema;
