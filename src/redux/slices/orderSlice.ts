"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { setIsLoaderFalse, setIsLoaderTrue } from "./commonSlice";
import { getAllOrderService } from "@/services/orderService";

interface Order {
  _id: string;
  product_id: [
    {
      _id: string;
      category_id: string;
      product_name: string;
      product_desc: string;
      product_image: string[];
      product_price: string;
      isStockAvailable: boolean;
      product_available_qty: number;
      product_size: string;
      status: boolean;
    }
  ];
  address_id: {
    _id: string;
    email_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    address1: string;
    address2: string;
    country: string;
    city: string;
    state: string;
    postal_code: string;
    status: boolean;
  };
  stripe_payment_id: string;
  stripe_customer_id: string;
  payment_status: string;
  payment_method_type: string;
  status: boolean;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    getAllOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

const { getAllOrdersSuccess } = orderSlice.actions;
export default orderSlice.reducer;

export const getAllOrders = () => async (dispatch: AppDispatch) => {
  try {
    await dispatch(setIsLoaderTrue());
    let response: any = await getAllOrderService();
    if (response.success === true) {
      await dispatch(getAllOrdersSuccess(response.data));
    }
    await dispatch(setIsLoaderFalse());
  } catch (e: any) {
    await dispatch(setIsLoaderFalse());
    if (e.code === 500) {
      console.log("error,", e);
    }
  }
};
