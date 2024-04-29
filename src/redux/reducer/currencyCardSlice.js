import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencyCardData: {
    0: [
      {
        symbol: "ETH",
        name: "Ether",
        balance: "0.00",
        decimals: "0",
        price: "3305.41",
        chain: "Ethereum",
      },
      {
        symbol: "MATIC",
        name: "Polygon",
        balance: "0.00",
        decimals: "0",
        price: "0.74",
        chain: "Polygon",
      },
    ],
  },
};

const currencyCardSlice = createSlice({
  name: "currencyCardData", // Slice name set to currencyCardData
  initialState,
  reducers: {
    addCardItem(state, action) {
      const { cardIndex, newItem } = action.payload;
      // Create a new array with the new item added
      const updatedItems = [...state.currencyCardData[cardIndex], newItem];
      // Update the state with the new array
      state.currencyCardData[cardIndex] = updatedItems;
    },
    updateCardItem(state, action) {
      const { cardIndex, itemIndex, updatedItem } = action.payload;
      state.currencyCardData[cardIndex][itemIndex] = updatedItem;
    },
    removeCardItem(state, action) {
      const { cardIndex, itemIndex } = action.payload;
      state.currencyCardData[cardIndex].splice(itemIndex, 1);
    },
  },
});

export const { addCardItem, updateCardItem, removeCardItem } =
  currencyCardSlice.actions;

export default currencyCardSlice.reducer;
