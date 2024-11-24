import axios from "axios";

const path = "https://api.novaposhta.ua/v2.0/json/";

export const getCitys = async () => {
  const result = await axios.post(path + "searchsettlements", {
    apiKey: "c5fc0636517d6d87d49f803904b096ca",
    modelName: "AddressGeneral",
    calledMethod: "searchSettlements",
    methodProperties: { CityName: "к", Limit: "10", Page: "2" },
  });
  console.log(result);
};
