import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./slices";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
  },
});
