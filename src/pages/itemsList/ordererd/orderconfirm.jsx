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
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
} from "@mui/material";
import { createOrder, getSetOfItems } from "@/service/api";
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
import { styleAdaptor } from "@/service/styleAdaptor";
import { useScreenSize } from "@/service/mediaHooks";

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
  const screensize = useScreenSize();
  const [npWarehouse, setNpWarehouse] = useState([]);
  const [warehouse, setWarehouse] = useState({});
  const [warehouseInput, setWarehouseInput] = useState("");
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentType, setPaymentType] = useState(null);
  const [name, setName] = useState("");
  const [sername, setSername] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [requestItems, setRequestItems] = useState([]);

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
      const res = await getWarehouse(city.DeliveryCity, name);
      setNpWarehouse(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fieldSize = { desctop: "400px", tablet: "200px" };

  const onConfirm = async () => {
    try {
      const info = {
        name,
        sername,
        phone,
        paymentType,
        deliveryData: JSON.stringify(warehouse),
        items: basket.map((item) => item.siid),
      };
      const res = await createOrder(info);
      window.localStorage.setItem("orderInfo", JSON.stringify(res));
      router.push("/itemsList/ordererd/orderresult");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const items = await getSetOfItems(basketItems);
        const res = [];
        basket.forEach(({ itemID, siid, count }) => {
          res.push({
            count,
            siid,
            item: items.find((item) => item._id === itemID),
          });
        });
        setItems(res);
        setTotalPrice(
          res.reduce(
            (prev, item) =>
              prev +
              (item.siid
                ? item.item.storedItems.find((si) => si._id === item.siid)
                    .priceUSD
                : item.item.storedItems[0].priceUSD) *
                item.count,
            0
          )
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [basket, setItems]);

  return (
    <>
      <CataogCover
        categoryes={categoryes}
        categoryName={"Оформлення замовлення"}
        catRes={catRes}
        noSearch
      >
        <ContainerFixed full={screensize === "mobile"}>
          <Grid container>
            <Grid size={{ desctop: 6, tablet: 5, mobile: 12 }}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={styleAdaptor("justify", "flex-start", "flex-start")}
                gap={"20px"}
              >
                <FormCover>
                  <Typography variant="body2">Контактні дані</Typography>
                  <TextField
                    fullWidth
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    sx={{ width: fieldSize }}
                    label="Ім'я"
                  />
                  <TextField
                    fullWidth
                    value={sername}
                    onChange={({ target }) => setSername(target.value)}
                    sx={{ width: fieldSize }}
                    label="Прізвище"
                  />
                  <TextField
                    fullWidth
                    value={phone}
                    onChange={({ target }) => setPhone(target.value)}
                    sx={{ width: fieldSize }}
                    label="Телефон"
                  />
                </FormCover>
                <FormCover>
                  <Typography variant="body2">Доставка</Typography>
                  <Box
                    width={{
                      desctop: "150px",
                      tablet: "100px",
                      mobile: "100px",
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/63/Nova_Poshta_2022_logo.png"
                      alt="nova poshta"
                    />
                  </Box>
                  <Autocomplete
                    fullWidth
                    sx={{ width: fieldSize }}
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
                    fullWidth
                    disabled={!city.Present}
                    sx={{ width: fieldSize }}
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
                  <FormControl sx={{ width: fieldSize }}>
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
            </Grid>
            <Grid
              display={styleAdaptor("none", "block", "block")}
              size={{ desctop: 6, tablet: 7 }}
            >
              <FormCover>
                <Typography variant="body2">Замовлення</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ fontWeight: "900" }} variant="body1">
                          Назва
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "900" }} variant="body1">
                          Вартість
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "900" }} variant="body1">
                          Кількість
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "900" }} variant="body1">
                          Загалом
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.item._id}>
                        <TableCell>
                          <Typography variant="body1">
                            {item.item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            $
                            {
                              item.item.storedItems.find(
                                (si) => si._id === item.siid
                              ).priceUSD
                            }
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">x{item.count}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            $
                            {item.item.storedItems.find(
                              (si) => si._id === item.siid
                            ).priceUSD * item.count}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ fontWeight: "900" }} variant="body1">
                          Загальна вартість
                        </Typography>
                      </TableCell>

                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      <TableCell>
                        <Typography sx={{ fontWeight: "900" }} variant="body1">
                          ${totalPrice}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </FormCover>
            </Grid>
          </Grid>
        </ContainerFixed>
      </CataogCover>
    </>
  );
}
