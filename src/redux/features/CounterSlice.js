// walletSlice.js

import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: null,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = walletSlice.actions;
export const selectWalletAddress = (state) => state.wallet.address;

export default walletSlice.reducer;
