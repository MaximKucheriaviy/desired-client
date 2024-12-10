import { starndartRequest } from "@/service/standartRequest";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import styled from "@emotion/styled";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import {
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { getItemByID } from "@/service/api";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { createBasketItem } from "@/service/createBasketItems";
import { useBasketItems } from "@/redux/selectors";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addItemToBasket, clearBasket } from "@/redux/slices";
import { styleAdaptor } from "@/service/styleAdaptor";

export async function getServerSideProps(context) {
  const { catRes, categoryes } = await starndartRequest();
  const { query } = context;
  const item = await getItemByID(query.id);
  return {
    props: {
      catRes,
      categoryes,
      item,
    },
  };
}

const StyledButton = styled.button(`
  padding: 0px;
  border: none;
  border-radius: 5px;
  overflow: hidden;
  outline: none;
  display: block;
  &:hover{
    outline: 1px solid white;
    box-shadow: 0px 0px 20px black;
    cursor: pointer;
  }               
`);

export default function ItemPage({ catRes, categoryes, item }) {
  const [imagePath, setImagePath] = useState(item.image.url || "/noImage.jpg");
  const [storedItem, setStoredItem] = useState(null);
  const [images, setImages] = useState([item.image, ...item.imageSet]);

  const router = useRouter();
  const basket = useBasketItems();
  const dispatch = useDispatch();
  const [inBasket, setInBasket] = useState(false);

  useEffect(() => {
    setInBasket(basket.some((id) => id === item._id));
  }, [basket, item._id]);

  const onBasketcliked = () => {
    if (inBasket) {
      return;
    }
    dispatch(addItemToBasket(createBasketItem(item._id, null)));
  };

  const onQuickByClicked = () => {
    if (!storedItem) {
      return;
    }
    dispatch(clearBasket());
    dispatch(addItemToBasket(createBasketItem(item._id, storedItem._id)));
    router.push("/itemsList/ordererd/orderconfirm");
  };

  return (
    <CataogCover catRes={catRes} categoryes={categoryes}>
      <Box padding={1}>
        <Grid container>
          <Grid
            display={styleAdaptor("flex", "auto", "auto")}
            flexDirection={"column"}
            alignItems={styleAdaptor("center", "flex-start", "flex-start")}
            gap={"10px"}
            size={{ desctop: 4, tablet: 6, mobile: 12 }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "26px", tablet: "26px", desctop: "36px" },
                display: styleAdaptor("block", "none", "none"),
              }}
              variant="body2"
            >
              {item.name}
            </Typography>
            <Box
              width={{ desctop: "300px", tablet: "220px", mobile: "220px" }}
              sx={{ aspectRatio: "9 / 14" }}
            >
              <img
                style={{ height: "100%", objectFit: "cover" }}
                src={imagePath}
                alt="main"
              />
            </Box>
          </Grid>
          <Grid size={{ desctop: 8, tablet: 6 }}>
            <Typography
              sx={{
                fontSize: { tablet: "26px", desctop: "36px" },
                display: styleAdaptor("none", "block", "block"),
              }}
              variant="body2"
            >
              {item.name}
            </Typography>
            <Box marginTop={"20px"}>
              <Typography component={"p"} variant="body2">
                Ціна:
                <Typography
                  marginLeft={"10px"}
                  variant="body2"
                  component={"span"}
                >
                  $
                  {storedItem
                    ? storedItem.priceUSD
                    : item.storedItems[0].priceUSD}
                </Typography>
              </Typography>
              <Box marginTop={"20px"} width={"200px"}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="size">Розмір</InputLabel>
                  <Select
                    renderValue={(value) => (value ? value.size : "")}
                    label="Розмір"
                    labelId="size"
                    onChange={({ target }) => {
                      setStoredItem(target.value);
                    }}
                    value={storedItem || ""}
                  >
                    {item.storedItems.map((item) => (
                      <MenuItem value={item} key={item._id}>
                        {item.size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                marginTop={{ desctop: "80px", tablet: "80px", mobile: "20px" }}
                display={"flex"}
                gap={"20px"}
              >
                {images.map((item) => (
                  <StyledButton
                    onClick={() => setImagePath(item.url)}
                    key={item._id}
                  >
                    <Box
                      sx={{ aspectRatio: "9 / 14" }}
                      width={{
                        desctop: "100px",
                        tablet: "80px",
                        mobile: "50px",
                      }}
                    >
                      <img
                        style={{ height: "100%", objectFit: "cover" }}
                        src={item.url}
                        alt="photo"
                      />
                    </Box>
                  </StyledButton>
                ))}
              </Box>
              <Box
                marginTop={"20px"}
                display={"flex"}
                gap={styleAdaptor("10px", "30px", "30px")}
                flexDirection={styleAdaptor("column", "row', 'row")}
              >
                <Button
                  color="button"
                  variant="contained"
                  startIcon={<LocalGroceryStoreIcon />}
                  onClick={onBasketcliked}
                >
                  Додати до кошика
                </Button>
                <Button
                  onClick={onQuickByClicked}
                  // color="primary"
                  variant="contained"
                  size="Small"
                  startIcon={<AdsClickIcon />}
                >
                  Замовити в один клік
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </CataogCover>
  );
}
