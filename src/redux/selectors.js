import { useSelector } from "react-redux";

export const useBasket = () => {
  return useSelector((state) => state.basket.value || []);
};

export const useBasketItems = () => {
  let arr = useSelector((state) => state.basket.value);
  arr = arr.map((item) => item.itemID);
  return arr;
};

export const useBasketSize = () => {
  let arr = useSelector((state) => state.basket.value);
  return arr.length;
};

export const useDrawer = () => {
  return useSelector((state) => state.drawer.value);
};
