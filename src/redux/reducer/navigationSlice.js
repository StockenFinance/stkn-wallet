// navigationSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = false;

// Slice creation
const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationEnabled(state, action) {
      return action.payload;
    },
  },
});

// Export actions
export const { setNavigationEnabled } = navigationSlice.actions;
export default navigationSlice.reducer;
