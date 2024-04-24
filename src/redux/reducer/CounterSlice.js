// walletSlice.js

import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: null,
    recoveryModal: false,
    myTabHide: false,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setModal: (state, action) => {
      state.recoveryModal = action.payload;
    },
    setMyTabHide: (state, action) => {
      state.myTabHide = action.payload;
    },
  },
});

export const { setAddress, setModal, setMyTabHide } = walletSlice.actions;
// export const selectWalletAddress = (state) => state.wallet.address;
// export const selectRecoveryModal = (state) => state.wallet.recoveryModal;

export default walletSlice.reducer;
