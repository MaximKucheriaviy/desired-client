import Grid from "@mui/material/Grid2";
import { Typography, Box, Button, IconButton } from "@mui/material";
import MainTheme from "@/theme/mainTheme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";

export const ItemCard = ({ item = {} }) => {
  const router = useRouter();

  const navigate = (id) => {
    router.push({
      pathname: "/item",
      query: {
        id,
      },
    });
  };
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
          aspectRatio: "9 / 14",
        }}
        position={"relative"}
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
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.568)" }}
          padding={1}
          position={"absolute"}
          left={"0px"}
          bottom={"0px"}
          height={"130px"}
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
