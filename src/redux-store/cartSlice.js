import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    value: [],
  },
  reducers: {},
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
