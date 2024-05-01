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
  name: "currencyCardData",
  initialState,
  reducers: {
    addCardItem(state, action) {
      const { cardIndex, newItems } = action.payload;

      if (Array.isArray(newItems)) {
        state.currencyCardData[cardIndex] = newItems;
      } else {
        state.currencyCardData[cardIndex] = [
          ...(state.currencyCardData[cardIndex] || []),
          newItems,
        ];
      }
    },
    updateCardItem(state, action) {
      const { cardIndex, itemIndex, updatedItem } = action.payload;
      state.currencyCardData[cardIndex][itemIndex] = updatedItem;
    },
    removeCardItem(state, action) {
      const { cardIndex, itemIndex } = action.payload;
      state.currencyCardData[cardIndex] = state.currencyCardData[
        cardIndex
      ].filter((_, index) => index !== itemIndex);
    },
    emptyCardData(state, action) {
      const cardIndex = action.payload;
      state.currencyCardData = Object.fromEntries(
        Object.entries(state.currencyCardData).filter(
          ([key]) => key !== cardIndex
        )
      );
    },
  },
});

export const { addCardItem, updateCardItem, removeCardItem, emptyCardData } =
  currencyCardSlice.actions;

export default currencyCardSlice.reducer;
