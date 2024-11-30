import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearBasket } from "@/redux/slices";

export async function getServerSideProps(context) {
  const { catRes, categoryes } = await starndartRequest();
  return {
    props: {
      catRes,
      categoryes,
    },
  };
}

export default function OrderResult({ catRes, categoryes }) {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!order) {
      const info = window.localStorage.getItem("orderInfo");
      if (!info) {
        router.push("/");
        return;
      }
      setOrder(JSON.parse(info));
    } else {
      window.localStorage.removeItem("orderInfo");
      dispatch(clearBasket());
    }
  }, [order, setOrder]);
  return (
    <CataogCover
      categoryes={categoryes}
      categoryName={"Заповлення прийняте"}
      catRes={catRes}
      noSearch
    >
      <Box>
        <Typography
          sx={{ textAlign: "center" }}
          component={"p"}
          variant="body2"
        >
          Ваше замовлення прийнято до обробки. Номер замовлення
        </Typography>
        {order && (
          <Typography
            sx={{ textAlign: "center" }}
            component={"p"}
            variant="body2"
          >
            № {order.ordernNumber}
          </Typography>
        )}
        <Typography
          sx={{ textAlign: "center" }}
          component={"p"}
          variant="body2"
        >
          Адміністратор зв'яжеться з вами найближчим часом
        </Typography>
      </Box>
    </CataogCover>
  );
}
