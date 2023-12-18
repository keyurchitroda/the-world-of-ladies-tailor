"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import {
  addToCartProductService,
  getAllCartProductService,
  getAllReadymadeProductService,
  removeCartProductService,
} from "@/services/readymadeProductService";
import _ from "lodash";
import {
  setAddToCartValue,
  setIsLoaderFalse,
  setIsLoaderTrue,
} from "./commonSlice";
import toast from "react-hot-toast";
import { getCookie } from "@/apiConfig/cookies";
import { defaultAuthTokenString } from "@/helpers/helper";
import { number } from "yup";

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
  addtocartproducts: any[];
  alladdtocartproducts: any[];
  cartcount: number;
}

const initialState: CategoryState = {
  products: [],
  addtocartproducts: [],
  alladdtocartproducts: [],
  cartcount: 0,
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

    addToCartProductSuccess: (state, action: PayloadAction<any[]>) => {
      state.addtocartproducts = [...state.addtocartproducts, action.payload];
    },
    allAddToCartProductSuccess: (state, action: PayloadAction<any[]>) => {
      state.alladdtocartproducts = action.payload;
    },
    setCartCountSuccess: (state, action: PayloadAction<number>) => {
      state.cartcount = action.payload;
    },
    deletCartProductWithoutTokenSuccess: (
      state,
      action: PayloadAction<any[]>
    ) => {
      state.addtocartproducts = action.payload;
    },
  },
});

const {
  getAllReadymadeProductSuccess,
  addToCartProductSuccess,
  allAddToCartProductSuccess,
  setCartCountSuccess,
  deletCartProductWithoutTokenSuccess,
} = readymadeProductSlice.actions;
export default readymadeProductSlice.reducer;

export const getAllReadymadeProduct =
  (categoryId: string) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setIsLoaderTrue());
      let response: any = await getAllReadymadeProductService(categoryId);
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

export const AddToCartProduct =
  (product: any) => async (dispatch: AppDispatch) => {
    try {
      const token = getCookie(defaultAuthTokenString);
      if (token) {
        const body = {
          product_id: product._id,
        };
        let response: any = await addToCartProductService(body);
        if (response.success === true) {
          toast.success(response.message);
          await dispatch(getAllCartProducts());
        } else {
          toast.success("Something went wrong");
        }
      } else {
        await dispatch(addToCartProductSuccess(product));
        // await dispatch(setAddToCartValue(true));
        toast.success("Product successfully added in cart");
      }
    } catch (error: any) {
      toast.error(error.message.error);
    }
  };

export const getAllCartProducts = () => async (dispatch: AppDispatch) => {
  try {
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      let response: any = await getAllCartProductService();
      if (response.success === true) {
        await dispatch(allAddToCartProductSuccess(_.get(response, "data", [])));
        await dispatch(
          setCartCountSuccess(_.size(_.get(response, "data", [])))
        );
      }
    }
  } catch (e: any) {
    if (e.code === 500) {
      console.log("error,", e);
    }
  }
};

export const deleteCartProducts =
  (productId: string) => async (dispatch: AppDispatch) => {
    try {
      const token = getCookie(defaultAuthTokenString);
      if (token) {
        let response: any = await removeCartProductService(productId);
        if (response.success === true) {
          toast.success(response.message);
          await dispatch(getAllCartProducts());
        }
      }
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

export const deleteCartProductsWithoutToken =
  (value: any) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(deletCartProductWithoutTokenSuccess(value));
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };
