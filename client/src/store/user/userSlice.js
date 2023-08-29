import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentData: null,
    token: null,
    isLoading: false,
    mes: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    clearMessages: (state) => {
      state.mes = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentData = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(actions.getCurrent.rejected, (state) => {
      state.isLoading = false;
      state.currentData = null;
      state.isLoggedIn = false;
      state.token = null;
      state.mes = "Phên đăng nhập đã hết hạn. Hãy đăng nhập lại";
    });
  },
});

export const { login, logout, clearMessages } = userSlice.actions;

export default userSlice.reducer;
