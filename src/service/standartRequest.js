import { getCategories, getTypes } from "./api";
import jsonDATA from "@/service/dataINFO.json";

export const starndartRequest = async () => {
  const { catRes, categoryes } = jsonDATA;
  return { catRes, categoryes };
};
