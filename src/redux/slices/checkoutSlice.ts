"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { setIsLoaderFalse, setIsLoaderTrue } from "./commonSlice";
import {
  addNewAddressService,
  getAllAddressByEmailIdService,
} from "@/services/checkoutService";
import toast from "react-hot-toast";

interface Address {
  _id: string;
  email_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  status: boolean;
}

interface CheckoutState {
  addresses: Address[];
  selectedAddress: any;
}

const initialState: CheckoutState = {
  addresses: [],
  selectedAddress: {},
};

export const checkoutSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    getAllAddressesByUserIdSuccess: (
      state,
      action: PayloadAction<Address[]>
    ) => {
      state.addresses = action.payload;
    },
    setSelectAddressSuccess: (state, action: PayloadAction<any>) => {
      state.selectedAddress = action.payload;
    },
  },
});

const { getAllAddressesByUserIdSuccess, setSelectAddressSuccess } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;

export const getAllAddressByEmail =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setIsLoaderTrue());
      let response: any = await getAllAddressByEmailIdService(email);
      if (response.success === true) {
        await dispatch(getAllAddressesByUserIdSuccess(response.data));
      }
      await dispatch(setIsLoaderFalse());
    } catch (e: any) {
      await dispatch(setIsLoaderFalse());
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

export const AddNewAddress = (body: any) => async (dispatch: AppDispatch) => {
  try {
    await dispatch(setIsLoaderTrue());
    let response: any = await addNewAddressService(body);
    if (response.success === true) {
      await dispatch(getAllAddressByEmail(body.email_id));
      toast.success(response.message);
    }
    await dispatch(setIsLoaderFalse());
  } catch (e: any) {
    await dispatch(setIsLoaderFalse());
    if (e.code === 500) {
      console.log("error,", e);
    }
  }
};

export const selectAddress =
  (address: any) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setSelectAddressSuccess(address));
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };
