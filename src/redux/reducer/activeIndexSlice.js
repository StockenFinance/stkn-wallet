// activeIndexSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeIndex: 0,
};

const activeIndexSlice = createSlice({
  name: "activeIndex",
  initialState,
  reducers: {
    setCardActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    clearActiveIndex: (state) => {
      state.activeIndex = 0;
    },
  },
});

export const { setCardActiveIndex, clearActiveIndex } =
  activeIndexSlice.actions;

export default activeIndexSlice.reducer;
