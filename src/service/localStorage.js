export const getBasketFromStorageF = () => {
  const arr = window.localStorage.getItem("basket");
  if (!arr) {
    return [];
  }
  return JSON.parse(arr);
};
export const updateBasketStorageF = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const clearBasketF = () => {
  localStorage.removeItem("basket");
  return [];
};
