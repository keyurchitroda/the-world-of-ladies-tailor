import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    email_id: {
      type: String,
      required: [true, "Please provide a email"],
    },
    first_name: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    address1: {
      type: String,
      required: [true, "Please provide a address1"],
    },
    address2: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Please provide a country"],
    },
    city: {
      type: String,
      required: [true, "Please provide a city"],
    },
    state: {
      type: String,
      required: [true, "Please provide a state"],
    },
    postal_code: {
      type: String,
      required: [true, "Please provide a postal code"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Address =
  mongoose.models.addressinfo || mongoose.model("addressinfo", addressSchema);
export default Address;
