import axios from "axios";

const path = "https://api.novaposhta.ua/v2.0/json/";

export const getCitys = async (CityName = "") => {
  const result = await axios.post(path + "searchsettlements", {
    apiKey: "c5fc0636517d6d87d49f803904b096ca",
    modelName: "AddressGeneral",
    calledMethod: "searchSettlements",
    methodProperties: { CityName, Limit: "10", Page: "1" },
  });
  return result.data.data;
};

export const getWarehouse = async (CityRef, line) => {
  const result = await axios.post(path + "searchsettlements", {
    apiKey: "c5fc0636517d6d87d49f803904b096ca",
    modelName: "AddressGeneral",
    calledMethod: "getWarehouses",
    methodProperties: {
      FindByString: line,
      CityRef,
      Page: "1",
      Limit: "50",
      Language: "UA",
    },
  });
  return result.data.data;
};
