import { useEffect } from "react";
import { getBasketFromStorage } from "@/redux/slices";
import { useDispatch } from "react-redux";

export const ReduxDefLoader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBasketFromStorage());
  }, [dispatch]);
  return <></>;
};
