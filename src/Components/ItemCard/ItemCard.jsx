import Grid from "@mui/material/Grid2";
import { Typography, Box } from "@mui/material";
import MainTheme from "@/theme/mainTheme";

export const ItemCard = ({ item = {} }) => {
  return (
    <Grid component="li" size={4}>
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "20px",
          border: `1px solid ${MainTheme.palette.gold.dark}`,
          backgroundImage: `url("${item.image.url || "./noImage.jpg"}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        position={"relative"}
        height="450px"
        width="100%"
      >
        <Box
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.322)", width: "100%" }}
          padding={1}
          position={"absolute"}
          left={"0px"}
          bottom={"0px"}
          height={"100px"}
        >
          <Typography>{item.name || ""}</Typography>
          <Typography>{item.price || ""}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};
