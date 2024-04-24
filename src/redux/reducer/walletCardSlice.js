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
    removeWalletCard: (state, action) => {
      state.walletCardData = state.walletCardData.filter(
        (card) => card.newWalletAddress !== action.payload.newWalletAddress
      );
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

export const { addWalletCard, removeWalletCard, updateWalletCardByIndex } =
  walletCardSlice.actions;
export default walletCardSlice.reducer;
