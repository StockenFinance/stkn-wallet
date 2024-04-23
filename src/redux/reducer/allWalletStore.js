import { createSlice } from "@reduxjs/toolkit";

const allWallteStore = createSlice({
  name: "wallet",
  initialState: {
    allWallets: [], // Initial state for storing all wallet addresses
  },
  reducers: {
    addWalletAtReduxStore: (state, action) => {
      state.allWallets.push(action.payload); // Add wallet address to the state
    },
    removeWallet: (state, action) => {
      state.allWallets = state.allWallets.filter(
        (wallet) => wallet !== action.payload
      );
    },
  },
});

export const { addWalletAtReduxStore, removeWallet } = allWallteStore.actions;

export default allWallteStore.reducer;
