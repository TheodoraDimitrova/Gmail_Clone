import { createSlice } from "@reduxjs/toolkit";

export const activeOptionSlice = createSlice({
  name: "activeOption",
  initialState: "inbox",
  reducers: {
    setActiveOption: (state, action) => action.payload,
  },
});

export const { setActiveOption } = activeOptionSlice.actions;

export default activeOptionSlice.reducer;
