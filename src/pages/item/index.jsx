import { starndartRequest } from "@/service/standartRequest";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import styled from "@emotion/styled";
import {
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { getItemByID } from "@/service/api";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

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
  border-radius: 10px;
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

  console.log(images);

  return (
    <CataogCover catRes={catRes} categoryes={categoryes}>
      <Box padding={1}>
        <Grid container>
          <Grid size={4}>
            <Box width={"350px"} sx={{ aspectRatio: "9 / 14" }}>
              <img
                style={{ height: "100%", objectFit: "cover" }}
                src={imagePath}
                alt="main"
              />
            </Box>
          </Grid>
          <Grid size={8}>
            <Typography style={{ fontSize: "36px" }} variant="body2">
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
              <Box marginTop={"100px"} display={"flex"} gap={"20px"}>
                {images.map((item) => (
                  <StyledButton
                    onClick={() => setImagePath(item.url)}
                    key={item._id}
                  >
                    <Box sx={{ aspectRatio: "9 / 14" }} width={"100px"}>
                      <img
                        style={{ height: "100%", objectFit: "cover" }}
                        src={item.url}
                        alt="photo"
                      />
                    </Box>
                  </StyledButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </CataogCover>
  );
}
