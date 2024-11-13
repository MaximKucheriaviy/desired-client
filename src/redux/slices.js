import { createSlice } from "@reduxjs/toolkit";
import {
  getBasketFromStorageF,
  updateBasketStorageF,
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
      state.value = [...state.value, payload];
      updateBasketStorageF(state.value);
    },
    changeItemSize: (state, { payload }) => {
      const index = state.value.findIndex(
        (item) => item.itemID === payload.itemID
      );
      state.value[index].siid = payload.siid;
    },
    removeItemFromBasket: (state, { payload }) => {
      state.value = state.value.filter((item) => item.itemID !== payload);
      updateBasketStorageF(state.value);
    },
    clearBasket: (state) => {
      state.value = [];
      clearBasket();
    },
  },
});

export const {
  addItemToBasket,
  removeItemFromBasket,
  clearBasket,
  getBasketFromStorage,
} = basketSlice.actions;
