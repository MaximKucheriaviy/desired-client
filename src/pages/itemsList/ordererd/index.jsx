import { Box, Table, TableBody, Button } from "@mui/material";
import { getSetOfItems } from "@/service/api";
import MainTheme from "@/theme/mainTheme";

import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useState, useEffect } from "react";
import { useBasket, useBasketItems } from "@/redux/selectors";
import { OrderedItem } from "@/Components/OrderedItem/OrderedItem";
import { ContainerFixed } from "@/Components/Container/Container";

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
      } catch (err) {
        console.log(err);
      }
    })();
  }, [basket, setItems]);
  console.log(items);

  return (
    <>
      <CataogCover
        categoryes={categoryes}
        categoryName={"Корзина"}
        catRes={catRes}
        noSearch
      >
        <ContainerFixed>
          <Table display={"flex"} flexDirection={"column"} gap={"20px"}>
            <TableBody>
              {items.map((item) => (
                <OrderedItem item={item} />
              ))}
            </TableBody>
          </Table>
          <Box sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              disabled={basket.some((item) => !item.siid)}
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
