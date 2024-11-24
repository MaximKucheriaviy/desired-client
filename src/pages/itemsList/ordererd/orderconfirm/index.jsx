import { Box, TextField } from "@mui/material";
import { getSetOfItems } from "@/service/api";
import MainTheme from "@/theme/mainTheme";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useState, useEffect } from "react";
import { useBasket, useBasketItems } from "@/redux/selectors";
import { ContainerFixed } from "@/Components/Container/Container";
import { getCitys } from "@/service/npAPI";

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
  useEffect(() => {
    (async () => {
      await getCitys();
    })();
  }, []);
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
          </Box>
        </ContainerFixed>
      </CataogCover>
    </>
  );
}
