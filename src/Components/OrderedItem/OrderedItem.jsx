import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { removeItemFromBasket } from "@/redux/slices";

export const OrderedItem = ({ item }) => {
  const dispatch = useDispatch();
  const [imagePath] = useState(item.image.url || "/noImage.jpg");

  return (
    <Box alignItems={"center"} display={"flex"} component={"li"}>
      <Box sx={{ width: "100px", aspectRatio: "9/14" }}>
        <img
          style={{ height: "100%", objectFit: "cover" }}
          src={imagePath}
          width={100}
          height={200}
          alt="cover"
        />
      </Box>
      <Typography variant="body1">{item.name}</Typography>
      <IconButton
        onClick={() => dispatch(removeItemFromBasket(item._id))}
        size="large"
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};
