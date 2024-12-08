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
      updateBasketStorageF(state.value);
    },
    changeItemCount: (state, { payload }) => {
      const index = state.value.findIndex(
        (item) => item.itemID === payload.itemID
      );
      console.log(payload.itemID);
      state.value[index].count = payload.count;
      updateBasketStorageF(state.value);
    },
    removeItemFromBasket: (state, { payload }) => {
      state.value = state.value.filter((item) => item.itemID !== payload);
      updateBasketStorageF(state.value);
    },
    clearBasket: (state) => {
      state.value = [];
      clearBasketF();
    },
  },
});

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    value: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.value = true;
    },
    closeDrawer: (state) => {
      state.value = false;
    },
  },
});

export const {
  addItemToBasket,
  removeItemFromBasket,
  clearBasket,
  changeItemCount,
  getBasketFromStorage,
  changeItemSize,
} = basketSlice.actions;

export const { openDrawer, closeDrawer } = drawerSlice.actions;
