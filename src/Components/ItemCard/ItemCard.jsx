import Grid from "@mui/material/Grid2";
import { Typography, Box, Button, IconButton } from "@mui/material";
import MainTheme from "@/theme/mainTheme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const ItemCard = ({ item = {} }) => {
  return (
    <Grid component="li" size={4}>
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "20px",
          border: `1px solid ${MainTheme.palette.primary.dark}`,
          backgroundImage: `url("${item.image.url || "./noImage.jpg"}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        position={"relative"}
        height="450px"
        width="100%"
      >
        <Box paddingRight={"10px"} justifyContent={"flex-end"} display={"flex"}>
          <IconButton
            // sx={{ border: "1px solid gray" }}
            color="primary"
            size="medium"
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            // sx={{ border: "1px solid gray" }}
            color="primary"
            size="medium"
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.568)", width: "100%" }}
          padding={1}
          position={"absolute"}
          left={"0px"}
          bottom={"0px"}
          height={"100px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Typography sx={{ fontWeight: 600, color: "Black" }} variant="body1">
            {item.name || ""}
          </Typography>
          <Box
            paddingLeft={"20px"}
            paddingRight={"20px"}
            alignItems={"center"}
            justifyContent="space-between"
            display={"flex"}
          >
            <Typography variant="priceCard">
              {item.price ? `$${item.price}` : ""}
            </Typography>
            <Button color="button" variant="contained">
              Детально
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
