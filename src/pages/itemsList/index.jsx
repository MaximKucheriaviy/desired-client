import {
  Box,
  Container,
  Pagination,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { getAllItems } from "@/service/api";
import MainTheme from "@/theme/mainTheme";
import Grid from "@mui/material/Grid2";
import { ItemCard } from "@/Components/ItemCard/ItemCard";
import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";
import { useState } from "react";
import Link from "next/link";
import { styleAdaptor } from "@/service/styleAdaptor";
import { useScreenSize } from "@/service/mediaHooks";

export async function getServerSideProps(context) {
  const { query } = context;
  query.limit = 12;
  const { catRes, categoryes } = await starndartRequest();
  const activeCat = catRes.find((cat) => cat._id === query.category);
  const items = await getAllItems(query);

  return {
    props: {
      catRes,
      categoryes,
      categoryName: activeCat ? activeCat.name : "Desired",
      items,
      page: query.page ? Number.parseInt(query.page) : 1,
      type: query.type || null,
    },
  };
}

export default function ItemList({
  page,
  items,
  catRes,
  categoryes,
  categoryName,
  type,
}) {
  const router = useRouter();
  const screenSize = useScreenSize();

  const onPagination = (event, value) => {
    const { pathname, query } = router;
    query.page = value;
    router.push({
      pathname,
      query,
    });
  };

  const categoryItem = categoryes.find(
    (item) => item.category.name === categoryName
  );
  const typeItem = categoryItem
    ? categoryItem.types.find((item) => item._id === type)
    : null;
  const [sortType, setSortType] = useState("ABS");

  const sortChangeHandle = ({ target }) => {
    setSortType(target.value);
    const query = { ...router.query, sortType: target.value };
    router.push({ pathname: router.pathname, query });
  };

  let pSize = "large";
  if (screenSize === "mobile") {
    pSize = "small";
  }

  return (
    <>
      <CataogCover
        categoryes={categoryes}
        categoryName={categoryName}
        catRes={catRes}
        maxPrice={items.maxPrice}
        minPrice={items.minPrice}
      >
        <Container
          sx={{
            width: {
              desctop: "978px",
              mobile: "100%",
            },
          }}
        >
          <Box
            justifyContent={"space-between"}
            alignItems={styleAdaptor("flex-start", "center", "center")}
            display={"flex"}
            marginBottom={"20px"}
            flexDirection={styleAdaptor("column", "row", "row")}
            gap={"20px"}
          >
            <Box display={"flex"} gap={"10px"}>
              {categoryItem && (
                <Link
                  href={{
                    pathname: "/itemsList",
                    query: { category: categoryItem.category._id },
                  }}
                >
                  <Typography>{categoryName}</Typography>
                </Link>
              )}
              {categoryItem && <Typography>{">"}</Typography>}
              {typeItem && (
                <Link
                  href={{
                    pathname: "/itemsList",
                    query: {
                      category: categoryItem.category._id,
                      type: typeItem._id,
                    },
                  }}
                >
                  <Typography>{typeItem.name}</Typography>
                </Link>
              )}
            </Box>
            <Box width={{ desctop: "200px", tablet: "150px", mobile: "150px" }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="sort">Сортувати за</InputLabel>
                <Select
                  onChange={sortChangeHandle}
                  value={sortType}
                  label="Сортувати за"
                  labelId="sort"
                >
                  <MenuItem value="ABS">Назва A-Я</MenuItem>
                  <MenuItem value="HPS">Найнижча ціна</MenuItem>
                  <MenuItem value="LPS">Найвища ціна</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid spacing={5} component="ul" container>
            {items.data.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </Grid>
          {items.totalPages > 1 && (
            <Box mt={"30px"} justifyContent={"center"} display={"flex"}>
              <Pagination
                color="button"
                shape="rounded"
                size={pSize}
                page={page}
                onChange={onPagination}
                sx={{
                  "& .MuiPaginationItem-root": {
                    "&:not(.Mui-selected)": {
                      color: MainTheme.palette.button.contrastText, // Кастомный цвет для неактивной кнопки
                    },
                  },
                }}
                count={items.totalPages}
              />
            </Box>
          )}
        </Container>
      </CataogCover>
    </>
  );
}
