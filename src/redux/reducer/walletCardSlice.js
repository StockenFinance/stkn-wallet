// walletCardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletCardData: [],
};

const walletCardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addWalletCard: (state, action) => {
      state.walletCardData.push(action.payload);
    },
    removeWalletCardByIndex: (state, action) => {
      const indexToRemove = action.payload;
      state.walletCardData.splice(indexToRemove, 1);
    },
    updateWalletCardByIndex: (state, action) => {
      const { index, newData } = action.payload;
      if (index >= 0 && index < state.walletCardData.length) {
        state.walletCardData[index] = {
          ...state.walletCardData[index],
          ...newData,
        };
      }
    },
  },
});

export const {
  addWalletCard,
  removeWalletCardByIndex,
  updateWalletCardByIndex,
} = walletCardSlice.actions;
export default walletCardSlice.reducer;
