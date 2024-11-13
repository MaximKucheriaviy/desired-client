import { createSlice } from "@reduxjs/toolkit";
import {
  getBasketFromStorageF,
  addItemToBasketF,
  removeItemFromBasketF,
  clearBasketF,
} from "@/service/localStorage";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    value: [],
  },
  reducers: {
    getBasketFromStorage: (state) => {
      state.value = getBasketFromStorageF();
    },
    addItemToBasket: (state, { payload }) => {
      state.value = addItemToBasketF(payload);
    },
    removeItemFromBasket: (state, { payload }) => {
      state.value = removeItemFromBasketF(payload);
    },
    clearBasket: (state) => {
      state.value = clearBasketF();
    },
  },
});

export const {
  addItemToBasket,
  removeItemFromBasket,
  clearBasket,
  getBasketFromStorage,
} = basketSlice.actions;
