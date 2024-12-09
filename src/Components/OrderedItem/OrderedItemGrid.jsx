import {
  Box,
  Typography,
  IconButton,
  TableCell,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { removeItemFromBasket } from "@/redux/slices";
import { changeItemCount, changeItemSize } from "@/redux/slices";
import Grid from "@mui/material/Grid2";

export const OrderedItemGrid = ({ item }) => {
  const dispatch = useDispatch();
  const [imagePath] = useState(item.item.image.url || "/noImage.jpg");
  const onCountChage = ({ target }) => {
    dispatch(
      changeItemCount({
        itemID: item.item._id,
        count: Number.parseInt(target.value),
      })
    );
  };

  const onSizeChange = ({ target }) => {
    dispatch(changeItemSize({ itemID: item.item._id, siid: target.value }));
  };

  return (
    <Grid
      paddingTop={"20px"}
      paddingBottom={"20px"}
      borderBottom={"1px solid black"}
      spacing={2}
      container
    >
      <Grid size={12}>
        <Typography style={{ fontSize: "24px" }} variant="body1">
          {item.item.name}
        </Typography>
      </Grid>
      <Grid size={6}>
        <Box
          sx={{
            width: { desctop: "70px", tablet: "60px" },
            aspectRatio: "9/14",
          }}
        >
          <img
            style={{ height: "100%", objectFit: "cover" }}
            src={imagePath}
            width={100}
            height={200}
            alt="cover"
          />
        </Box>
      </Grid>
      <Grid size={6}>
        <TextField
          label="Кількість"
          onChange={onCountChage}
          value={item.count}
          sx={{ width: "100px", color: "white" }}
          size="small"
          type="number"
        />
      </Grid>

      <Grid size={12}>
        <Typography style={{ fontSize: "20px" }} variant="body1">
          $
          {item.siid
            ? item.item.storedItems.find((si) => si._id === item.siid).priceUSD
            : item.item.storedItems[0].priceUSD}
        </Typography>
      </Grid>
      <Grid size={12}>
        <FormControl fullWidth size="small">
          <InputLabel id={item.item._id}>Розмір</InputLabel>
          <Select
            label="Розмір"
            labelId="item.item._id"
            onChange={onSizeChange}
            value={item.siid || ""}
          >
            {item.item.storedItems.map((sitem) => (
              <MenuItem
                key={sitem._id}
                sx={{ color: "black" }}
                value={sitem._id}
              >
                {sitem.size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={6}>
        <IconButton
          onClick={() => dispatch(removeItemFromBasket(item.item._id))}
          size="small"
          sx={{
            border: "1px solid white", // Устанавливаем обводку
            borderRadius: "20%", // Делаем кнопку круглой (по умолчанию так у IconButton)
          }}
        >
          <DeleteOutlineIcon sx={{ color: "white" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
