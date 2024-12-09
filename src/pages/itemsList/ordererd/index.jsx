import {
  Box,
  Table,
  TableBody,
  Button,
  Typography,
  TableRow,
  TableCell,
} from "@mui/material";
import { getSetOfItems } from "@/service/api";

import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useState, useEffect } from "react";
import { useBasket, useBasketItems } from "@/redux/selectors";
import { OrderedItem } from "@/Components/OrderedItem/OrderedItem";
import { ContainerFixed } from "@/Components/Container/Container";
import { styleAdaptor } from "@/service/styleAdaptor";
import { OrderedItemGrid } from "@/Components/OrderedItem/OrderedItemGrid";

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
  const [items, setItems] = useState([]);
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);

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
  }, [basket, setItems, setTotalPrice]);
  return (
    <>
      <CataogCover
        categoryes={categoryes}
        categoryName={"Корзина"}
        catRes={catRes}
        noSearch
      >
        <ContainerFixed>
          {basketItems.length === 0 && (
            <Typography variant="body2">Корзина наразі порожня</Typography>
          )}
          <Table
            sx={{ display: styleAdaptor("none", "table", "table") }}
            gap={"20px"}
          >
            <TableBody>
              {items.map((item) => (
                <OrderedItem key={item._id} item={item} />
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography>Загальна сума</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">${totalPrice}</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box display={styleAdaptor("block", "none", "none")}>
            {items.map((item) => (
              <OrderedItemGrid key={item._id} item={item} />
            ))}
          </Box>
          <Typography style={{ fontSize: "24px" }} variant="body2">
            Всього ${totalPrice}
          </Typography>
          <Box sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              disabled={
                basket.some((item) => !item.siid) || basketItems.length === 0
              }
              variant="contained"
              onClick={() =>
                router.push({ pathname: `${router.pathname}/orderconfirm` })
              }
            >
              Оформити
            </Button>
          </Box>
        </ContainerFixed>
      </CataogCover>
    </>
  );
}
