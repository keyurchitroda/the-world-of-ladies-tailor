"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getAllReadymadeProductService } from "@/services/readymadeProductService";
import _ from "lodash";
import { setIsLoaderFalse, setIsLoaderTrue } from "./commonSlice";

interface ReadyMadeProductInterface {
  _id: string;
  category_id: {
    _id: string;
    category_name: string;
    category_image: string;
    status: boolean;
  };
  product_name: string;
  product_desc: string;
  product_image: string[];
  product_price: string;
  isStockAvailable: boolean;
  product_available_qty: number;
  product_size: string;
  status: boolean;
}

interface CategoryState {
  products: ReadyMadeProductInterface[];
}

const initialState: CategoryState = {
  products: [],
};

export const readymadeProductSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    getAllReadymadeProductSuccess: (
      state,
      action: PayloadAction<ReadyMadeProductInterface[]>
    ) => {
      state.products = action.payload;
    },
  },
});

const { getAllReadymadeProductSuccess } = readymadeProductSlice.actions;
export default readymadeProductSlice.reducer;

export const getAllReadymadeProduct =
  (categoryId: string) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setIsLoaderTrue());
      let response: any = await getAllReadymadeProductService(categoryId);
      console.log("response", response);
      if (response.success === true) {
        dispatch(getAllReadymadeProductSuccess(_.get(response, "data", [])));
      }
      await dispatch(setIsLoaderFalse());
    } catch (e: any) {
      await dispatch(setIsLoaderFalse());
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };
