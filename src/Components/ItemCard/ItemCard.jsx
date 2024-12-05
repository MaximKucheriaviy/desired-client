import Grid from "@mui/material/Grid2";
import { Typography, Box, Button, IconButton } from "@mui/material";
import MainTheme from "@/theme/mainTheme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import { addItemToBasket } from "@/redux/slices";
import { useDispatch } from "react-redux";
import { useBasketItems } from "@/redux/selectors";
import { useState, useEffect } from "react";
import { createBasketItem } from "@/service/createBasketItems";

export const ItemCard = ({ item = {} }) => {
  const router = useRouter();
  const basket = useBasketItems();
  const dispatch = useDispatch();
  const [inBasket, setInBasket] = useState(false);

  useEffect(() => {
    setInBasket(basket.some((id) => id === item._id));
  }, [basket]);

  const onBasketcliked = () => {
    if (inBasket) {
      return;
    }
    dispatch(addItemToBasket(createBasketItem(item._id, null)));
  };

  const navigate = (id) => {
    router.push({
      pathname: "/item",
      query: {
        id,
      },
    });
  };
  return (
    <Grid component="li" size={{ desctop: 4, tablet: 6 }}>
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "20px",
          border: `1px solid ${MainTheme.palette.primary.dark}`,
          backgroundImage: `url("${item.image.url || "./noImage.jpg"}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: "9 / 14",
        }}
        position={"relative"}
        width="100%"
      >
        <Box paddingRight={"10px"} justifyContent={"flex-end"} display={"flex"}>
          <IconButton
            // sx={{ border: "1px solid gray" }}
            color="black"
            size="medium"
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            // sx={{ border: "1px solid gray" }}
            color="black"
            size="medium"
            onClick={onBasketcliked}
          >
            {inBasket ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.568)" }}
          padding={1}
          position={"absolute"}
          left={"0px"}
          bottom={"0px"}
          height={{ desctop: "130px", tablet: "80px" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography sx={{ fontWeight: 600, color: "Black" }} variant="body1">
            {item.name || ""}
          </Typography>
          <Box
            alignItems={"center"}
            justifyContent="space-between"
            display={"flex"}
          >
            <Typography variant="priceCard">
              {item.price ? `$${item.price}` : ""}
            </Typography>
            <Button
              onClick={() => navigate(item._id)}
              color="button"
              variant="contained"
            >
              Детально
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
