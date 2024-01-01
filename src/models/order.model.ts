import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "readymade",
      },
    ],
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addressinfo",
      required: true,
    },
    stripe_payment_id: {
      type: String,
      required: true,
    },
    stripe_customer_id: {
      type: String,
      required: true,
    },
    total_amount: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    payment_method_type: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Orders =
  mongoose.models.orders1 || mongoose.model("orders1", orderSchema);
export default Orders;
