import { Box, TextField, Autocomplete } from "@mui/material";
import { getSetOfItems } from "@/service/api";
import MainTheme from "@/theme/mainTheme";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useState, useEffect } from "react";
import { useBasket, useBasketItems } from "@/redux/selectors";
import { ContainerFixed } from "@/Components/Container/Container";
import { getCitys, getWarehouse } from "@/service/npAPI";

export async function getServerSideProps(context) {
  const { catRes, categoryes } = await starndartRequest();
  return {
    props: {
      catRes,
      categoryes,
    },
  };
}

export default function OrderedItems({ catRes, categoryes }) {
  const basket = useBasket();
  const basketItems = useBasketItems();
  const [npCitys, setNpCitys] = useState([]);
  const [city, setCity] = useState({});
  const [cityInput, setCityInput] = useState("");

  const [npWarehouse, setNpWarehouse] = useState([]);
  const [warehouse, setWarehouse] = useState({});
  const [warehouseInput, setWarehouseInput] = useState("");

  const getNewCitys = async (name) => {
    try {
      const res = await getCitys(name);

      setNpCitys(res[0].Addresses);
    } catch (err) {
      console.log(err);
    }
  };

  const getNewWarehouse = async (name) => {
    try {
      console.log(city.DeliveryCity);
      const res = await getWarehouse(city.DeliveryCity, name);
      console.log(res);

      setNpWarehouse(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CataogCover
        categoryes={categoryes}
        categoryName={"Оформлення замовлення"}
        catRes={catRes}
        noSearch
      >
        <ContainerFixed>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={"20px"}
          >
            <TextField label="Ім'я" />
            <TextField label="Прізвище" />
            <TextField label="Телефон" />
            <Autocomplete
              sx={{ width: "400px" }}
              options={npCitys}
              onChange={async (event, newValue) => {
                if (!newValue) {
                  setCity({});
                  return;
                }
                setCity(newValue);
                setCityInput(city.Present);
              }}
              inputValue={cityInput}
              onInputChange={(event, newInputValue) => {
                setCityInput(newInputValue);
                if (newInputValue.length < 3) {
                  return;
                }

                setWarehouse({});
                setWarehouseInput("");
                getNewCitys(newInputValue);
              }}
              getOptionLabel={(option) => {
                return option.Present || "";
              }}
              renderInput={(params) => <TextField {...params} label="Місто" />}
            />
            <Autocomplete
              disabled={!city.DeliveryCity}
              sx={{ width: "400px" }}
              options={npWarehouse}
              onChange={(event, newValue) => {
                if (!newValue) {
                  return;
                }
                setWarehouse(newValue);
              }}
              value={warehouse.Description || ""}
              inputValue={warehouseInput}
              onInputChange={async (event, newInputValue) => {
                setWarehouseInput(newInputValue);
                await getNewWarehouse(newInputValue);
              }}
              getOptionLabel={(option) => {
                return option.Description || "";
              }}
              renderInput={(params) => (
                <TextField {...params} label="Відділення" />
              )}
            />
          </Box>
        </ContainerFixed>
      </CataogCover>
    </>
  );
}
