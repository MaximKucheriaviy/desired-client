import { Box, Container, Pagination } from "@mui/material";
import { getSetOfItems } from "@/service/api";
import MainTheme from "@/theme/mainTheme";
import Grid from "@mui/material/Grid2";
import { ItemCard } from "@/Components/ItemCard/ItemCard";
import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useState, useEffect } from "react";
import { useBasket, useBasketItems } from "@/redux/selectors";
import { OrderedItem } from "@/Components/OrderedItem/OrderedItem";

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

  useEffect(() => {
    (async () => {
      try {
        const items = await getSetOfItems(basketItems);
        setItems(items);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [basket, setItems]);

  return (
    <>
      <CataogCover
        categoryes={categoryes}
        categoryName={"Корзина"}
        catRes={catRes}
        noSearch
      >
        <Container>
          {items.map((item) => (
            <OrderedItem item={item} />
          ))}
        </Container>
      </CataogCover>
    </>
  );
}
