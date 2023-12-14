"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import _ from "lodash";
import {
  getAllCustomizeCategoryService,
  getAllCustomizeProductService,
} from "@/services/customizeService";

interface CustomizeCategoryInterface {
  _id: string;
  category_id: {
    _id: string;
    category_name: string;
    category_image: string;
    status: boolean;
  };
  customize_category_name: string;
  customize_category_desc: string;
  status: boolean;
}

interface CustomizeProductInterface {
  _id: string;
  category_id: {
    _id: string;
    category_name: string;
    category_image: string;
    status: boolean;
  };
  customize_category_id: {
    _id: string;
    category_id: string;
    customize_category_name: string;
    customize_category_desc: string;
    status: true;
  };
  customize_product_name: string;
  customize_product_desc: string;
  customize_product_image: string;
  customize_product_price: string;
  status: boolean;
}

interface CustomizeCategoryState {
  categories: CustomizeCategoryInterface[];
  current_category: number;
  products: CustomizeProductInterface[];
}

const initialState: CustomizeCategoryState = {
  categories: [],
  products: [],
  current_category: 0,
};

export const customizeSlice: any = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    getAllCustomizeCategorySuccess: (
      state,
      action: PayloadAction<CustomizeCategoryInterface[]>
    ) => {
      state.categories = action.payload;
    },
    setCurrentCustomizeCategorySuccess: (
      state,
      action: PayloadAction<number>
    ) => {
      state.current_category = action.payload;
    },
    getAllCustomizeProductSuccess: (
      state,
      action: PayloadAction<CustomizeProductInterface[]>
    ) => {
      state.products = action.payload;
    },
  },
});

const {
  getAllCustomizeCategorySuccess,
  setCurrentCustomizeCategorySuccess,
  getAllCustomizeProductSuccess,
} = customizeSlice.actions;
export default customizeSlice.reducer;

export const getAllCustomizeCategory =
  (categoryId: string) => async (dispatch: AppDispatch) => {
    try {
      let response: any = await getAllCustomizeCategoryService(categoryId);
      console.log("response", response);
      if (response.success === true) {
        await dispatch(
          getAllCustomizeCategorySuccess(_.get(response, "data", []))
        );
        await dispatch(
          getAllCustomizeProduct(_.get(response, "data[0]._id", ""))
        );
        await dispatch(setCurrentCustomizeCategorySuccess(0));
      }
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

export const netxCategoryStep =
  (steps: number) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setCurrentCustomizeCategorySuccess(steps));
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

export const getAllCustomizeProduct =
  (categoryId: string) => async (dispatch: AppDispatch) => {
    try {
      let response: any = await getAllCustomizeProductService(categoryId);
      console.log("response", response);
      if (response.success === true) {
        await dispatch(
          getAllCustomizeProductSuccess(_.get(response, "data", []))
        );
      }
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };
