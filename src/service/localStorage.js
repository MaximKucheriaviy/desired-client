export const getBasketFromStorageF = () => {
  const arr = window.localStorage.getItem("basket");
  if (!arr) {
    return [];
  }
  return JSON.parse(arr);
};
export const addItemToBasketF = (id) => {
  let arr = window.localStorage.getItem("basket");
  if (!arr) {
    arr = [];
  } else {
    arr = JSON.parse(arr);
  }
  arr.push(id);
  window.localStorage.setItem("basket", JSON.stringify(arr));
  return arr;
};

export const removeItemFromBasketF = (id) => {
  let arr = window.localStorage.getItem("basket");
  if (!arr) {
    arr = [];
  } else {
    arr = JSON.parse(arr);
  }
  arr = arr.filter((item) => item !== id);
  localStorage.setItem("basket", JSON.stringify(arr));
  return arr;
};

export const clearBasketF = () => {
  localStorage.removeItem("basket");
  return [];
};
