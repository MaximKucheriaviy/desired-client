import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { createOrder } from "@/service/api";
import MainTheme from "@/theme/mainTheme";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useState, useEffect } from "react";
import { useBasket, useBasketItems } from "@/redux/selectors";
import { ContainerFixed } from "@/Components/Container/Container";
import { getCitys, getWarehouse } from "@/service/npAPI";
import { FormCover } from "@/Components/FormCover/FormCover";

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

  const [paymentType, setPaymentType] = useState(null);

  const [name, setName] = useState("");
  const [sername, setSername] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

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
      setNpWarehouse(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onConfirm = async () => {
    try {
      const info = {
        name,
        sername,
        phone,
        paymentType,
        deliveryData: JSON.stringify(warehouse),
        items: basketItems,
      };
      const res = await createOrder(info);
      window.localStorage.setItem("orderInfo", JSON.stringify(res));
      router.push("/itemsList/ordererd/orderresult");
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
            <FormCover>
              <Typography variant="body2">Контактні дані</Typography>
              <TextField
                value={name}
                onChange={({ target }) => setName(target.value)}
                sx={{ width: "400px" }}
                label="Ім'я"
              />
              <TextField
                value={sername}
                onChange={({ target }) => setSername(target.value)}
                sx={{ width: "400px" }}
                label="Прізвище"
              />
              <TextField
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
                sx={{ width: "400px" }}
                label="Телефон"
              />
            </FormCover>
            <FormCover>
              <Typography variant="body2">Доставка</Typography>
              <Box width="150px">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/63/Nova_Poshta_2022_logo.png"
                  alt="nova poshta"
                />
              </Box>
              <Autocomplete
                sx={{ width: "400px" }}
                options={npCitys}
                onChange={(event, newValue) => {
                  if (!newValue) {
                    setCity({}); // Сбрасываем выбранное значение
                    setCityInput(""); // Сбрасываем текст в поле ввода
                    return;
                  }
                  setCity(newValue); // Обновляем выбранный город
                  setCityInput(newValue.Present); // Устанавливаем текст в поле ввода на основе нового значения
                }}
                value={city} // Управляемое состояние для выбранного значения
                inputValue={cityInput} // Управляемое состояние для текста ввода
                onInputChange={(event, newInputValue) => {
                  setCityInput(newInputValue); // Обновляем текст в поле ввода
                  getNewCitys(newInputValue); // Запрашиваем новые города (например, асинхронный поиск)
                }}
                getOptionLabel={(option) => option.Present || ""} // Указываем, как отображать текст опций
                renderInput={(params) => (
                  <TextField {...params} label="Місто" />
                )}
              />
              <Autocomplete
                disabled={!city.Present}
                sx={{ width: "400px" }}
                options={npWarehouse}
                onChange={(event, newValue) => {
                  if (!newValue) {
                    setWarehouse({}); // Сбрасываем выбранное значение
                    setWarehouseInput(""); // Сбрасываем текст в поле ввода
                    return;
                  }
                  setWarehouse(newValue); // Обновляем выбранный город
                  setWarehouseInput(newValue.Description); // Устанавливаем текст в поле ввода на основе нового значения
                }}
                value={warehouse} // Управляемое состояние для выбранного значения
                inputValue={warehouseInput} // Управляемое состояние для текста ввода
                onInputChange={(event, newInputValue) => {
                  setWarehouseInput(newInputValue); // Обновляем текст в поле ввода
                  getNewWarehouse(newInputValue); // Запрашиваем новые города (например, асинхронный поиск)
                }}
                getOptionLabel={(option) => option.Description || ""} // Указываем, как отображать текст опций
                renderInput={(params) => (
                  <TextField {...params} label="Відділення" />
                )}
              />
            </FormCover>
            <FormCover>
              <FormControl sx={{ width: "400px" }}>
                <FormLabel id="paumentType">
                  <Typography variant="body2">Спосіб оплати</Typography>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="paumentType"
                  name="paumentType"
                  value={paymentType}
                  onChange={({ target }) => setPaymentType(target.value)}
                >
                  <FormControlLabel
                    value="bank"
                    control={<Radio />}
                    label="Банківський переказ"
                  />
                  <FormControlLabel
                    value="receive"
                    control={<Radio />}
                    label="При отриманні"
                  />
                </RadioGroup>
              </FormControl>
            </FormCover>
            <Button
              disabled={
                !name ||
                !sername ||
                !phone ||
                !city.Present ||
                !warehouse.Description ||
                !paymentType
              }
              onClick={onConfirm}
              variant="contained"
            >
              Підтвердити замовлення
            </Button>
          </Box>
        </ContainerFixed>
      </CataogCover>
    </>
  );
}
