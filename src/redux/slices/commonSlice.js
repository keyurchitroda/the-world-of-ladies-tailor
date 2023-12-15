import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UIGlobalLoader: false,
};

export const UILoader = createSlice({
  name: "loader",
  initialState,
  reducers: {
    isLoadingTrue: (state, action) => {
      state.UIGlobalLoader = true;
    },
    isLoadingFalse: (state, action) => {
      state.UIGlobalLoader = false;
    },
  },
});

const { isLoadingTrue, isLoadingFalse } = UILoader.actions;
export default UILoader.reducer;

export const setIsLoaderTrue = () => async (dispatch) => {
  dispatch(isLoadingTrue());
};

export const setIsLoaderFalse = () => async (dispatch) => {
  dispatch(isLoadingFalse());
};
