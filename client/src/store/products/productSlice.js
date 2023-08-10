import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProduct: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getNewProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProduct = action.payload;
    });

    builder.addCase(actions.getNewProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
