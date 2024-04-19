import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChain: "All",
};

const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    setCurrentChain: (state, action) => {
      console.log("state----action", state, action);
      state.currentChain = action.payload;
    },
  },
});

export const { setCurrentChain } = chainSlice.actions;

export default chainSlice.reducer;
