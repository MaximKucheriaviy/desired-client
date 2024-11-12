import { Box, Container, Pagination } from "@mui/material";
import { getAllItems } from "@/service/api";
import MainTheme from "@/theme/mainTheme";
import Grid from "@mui/material/Grid2";
import { ItemCard } from "@/Components/ItemCard/ItemCard";
import { useRouter } from "next/router";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import { starndartRequest } from "@/service/standartRequest";

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
    },
  };
}

export default function ItemList({
  page,
  items,
  catRes,
  categoryes,
  categoryName,
}) {
  const router = useRouter();

  const onPagination = (event, value) => {
    const { pathname, query } = router;
    query.page = value;
    router.push({
      pathname,
      query,
    });
  };

  return (
    <>
      <CataogCover
        categoryes={categoryes}
        categoryName={categoryName}
        catRes={catRes}
      >
        <Container
          sx={{
            width: {
              desctop: "978px",
            },
          }}
        >
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
                size="large"
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
