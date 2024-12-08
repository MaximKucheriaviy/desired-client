import { configureStore } from "@reduxjs/toolkit";
import { basketSlice, drawerSlice } from "./slices";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    drawer: drawerSlice.reducer,
  },
});
