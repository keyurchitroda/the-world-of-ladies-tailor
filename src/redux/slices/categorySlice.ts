"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getAllCategoryService } from "@/services/categoryService";
// import { setIsLoaderFalse, setIsLoaderTrue } from "./commonSlice";

interface Category {
  _id: string;
  category_name: string;
  category_image: string;
  status: boolean;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categroySlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    getAllCategorySuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

const { getAllCategorySuccess } = categroySlice.actions;
export default categroySlice.reducer;

export const getAllCategory = () => async (dispatch: AppDispatch) => {
  try {
    let response: any = await getAllCategoryService();
    console.log("response", response);
    if (response.success === true) {
      dispatch(getAllCategorySuccess(response.data));
    }
  } catch (e: any) {
    if (e.code === 500) {
      console.log("error,", e);
    }
  }
};
