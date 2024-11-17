import {
  Box,
  Typography,
  IconButton,
  TableCell,
  TableRow,
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

export const OrderedItem = ({ item }) => {
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
    <TableRow>
      <TableCell sx={{ maxWidth: "70px" }}>
        <Box sx={{ width: "70px", aspectRatio: "9/14" }}>
          <img
            style={{ height: "100%", objectFit: "cover" }}
            src={imagePath}
            width={100}
            height={200}
            alt="cover"
          />
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{item.item.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          $
          {item.siid
            ? item.item.storedItems.find((si) => si._id === item.siid).priceUSD
            : item.item.storedItems[0].priceUSD}
        </Typography>
      </TableCell>
      <TableCell sx={{ width: "200px" }}>
        <FormControl fullWidth size="small">
          <InputLabel id={item.item._id}>Розмір</InputLabel>
          <Select onChange={onSizeChange} value={item.siid || ""}>
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
      </TableCell>
      <TableCell>
        <TextField
          onChange={onCountChage}
          value={item.count}
          sx={{ width: "100px", color: "white" }}
          size="small"
          type="number"
        />
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() => dispatch(removeItemFromBasket(item.item._id))}
          size="large"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
