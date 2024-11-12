import { getCategories, getTypes } from "./api";

export const starndartRequest = async () => {
  const catRes = await getCategories();
  const categoryes = [];

  for (let i = 0; i < catRes.length; i++) {
    categoryes.push({
      category: catRes[i],
      types: await getTypes(catRes[i]._id),
    });
  }
  return { catRes: [...catRes, { _id: "111", name: "Новинки" }], categoryes };
};
