import { useSelector } from "react-redux";

export const useBasket = () => {
  return useSelector((state) => state.basket.value);
};
