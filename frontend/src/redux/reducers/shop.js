import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading:true,
};
const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadShopSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.shop = action.payload;
    })
    .addCase("LoadShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default shopReducer;