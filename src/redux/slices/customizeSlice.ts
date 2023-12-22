"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import _ from "lodash";
import {
  getAllCustomizeCategoryService,
  getAllCustomizeProductService,
} from "@/services/customizeService";
import { setIsLoaderFalse, setIsLoaderTrue } from "./commonSlice";

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
  selectedProducts: CustomizeProductInterface[];
  is_special_instruction: boolean;
}

const initialState: CustomizeCategoryState = {
  categories: [],
  products: [],
  current_category: 0,
  selectedProducts: [],
  is_special_instruction: false,
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
    isSpecialInstruction: (state, action: PayloadAction<boolean>) => {
      state.is_special_instruction = action.payload;
    },
    setSelectCustimizeProductSuccess: (
      state,
      action: PayloadAction<CustomizeProductInterface[]>
    ) => {
      const existingProductIndex = state.selectedProducts.findIndex(
        (item) =>
          item.customize_category_id._id ===
          action.payload[0].customize_category_id._id
      );
      if (existingProductIndex !== -1) {
        state.selectedProducts.splice(
          existingProductIndex,
          1,
          ...action.payload
        );
      } else {
        state.selectedProducts.push(...action.payload);
      }
    },
  },
});

const {
  getAllCustomizeCategorySuccess,
  setCurrentCustomizeCategorySuccess,
  getAllCustomizeProductSuccess,
  setSelectCustimizeProductSuccess,
  isSpecialInstruction,
} = customizeSlice.actions;
export default customizeSlice.reducer;

export const getAllCustomizeCategory =
  (categoryId: string) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setIsLoaderTrue());
      let response: any = await getAllCustomizeCategoryService(categoryId);
      if (response.success === true) {
        await dispatch(
          getAllCustomizeCategorySuccess(_.get(response, "data", []))
        );
        await dispatch(
          getAllCustomizeProduct(_.get(response, "data[0]._id", ""))
        );
        await dispatch(setCurrentCustomizeCategorySuccess(0));
      }
      await dispatch(setIsLoaderFalse());
    } catch (e: any) {
      await dispatch(setIsLoaderFalse());
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
      await dispatch(setIsLoaderTrue());
      let response: any = await getAllCustomizeProductService(categoryId);
      if (response.success === true) {
        await dispatch(
          getAllCustomizeProductSuccess(_.get(response, "data", []))
        );
      }
      await dispatch(setIsLoaderFalse());
    } catch (e: any) {
      await dispatch(setIsLoaderFalse());
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

export const selectCustomizeProduct =
  (product: any) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setSelectCustimizeProductSuccess([product]));
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

export const setSpecialInstruction =
  (value: boolean) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(isSpecialInstruction());
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

export const setInputValue =
  (inputvalue: any) => async (dispatch: AppDispatch) => {
    try {
      await dispatch(setSelectCustimizeProductSuccess([inputvalue]));
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };
