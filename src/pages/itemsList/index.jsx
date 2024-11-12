import Header from "@/Components/Header/Header";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Container,
  Pagination,
} from "@mui/material";
import { Footer } from "@/Components/Footer/Footer";
import { NavigationBar } from "@/Components/NavigationBar/NavigationBar";
import { getAllItems, getCategories, getTypes } from "@/service/api";
import MainTheme from "@/theme/mainTheme";
import { HeaderSizes } from "@/service/suportStyles";
import { ContainerFixed } from "@/Components/Container/Container";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import { LeftNavigationAccordion } from "@/Components/LeftNavigationAccordion/LeftNavigationAcordion";
import { ItemCard } from "@/Components/ItemCard/ItemCard";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { query } = context;
  query.limit = 12;
  const catRes = await getCategories();
  const categoryes = [];

  for (let i = 0; i < catRes.length; i++) {
    categoryes.push({
      category: catRes[i],
      types: await getTypes(catRes[i]._id),
    });
  }

  const activeCat = catRes.find((cat) => cat._id === query.category);
  const items = await getAllItems(query);

  return {
    props: {
      catRes: [...catRes, { _id: "111", name: "Новинки" }],
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
      <Header />
      <Box>
        <Box
          sx={{
            paddingBottom: {
              desctop: "10px",
            },
            paddingTop: HeaderSizes,
            background: `linear-gradient(160deg, ${MainTheme.palette.darkRed.main} 0%,${MainTheme.palette.darkRed.dark} 100%);`,
          }}
        >
          <ContainerFixed>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
              sx={{
                height: {
                  desctop: "100px",
                },
              }}
            >
              <Box width={100}>
                <Image src="/logo1.png" width={904} height={400} />
              </Box>
              <Typography variant="h2">{categoryName}</Typography>
              <TextField
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </ContainerFixed>
        </Box>
      </Box>
      <NavigationBar categories={catRes} />
      <Box componsnt="section">
        <Grid container>
          <Grid size={2}>
            <Box
              borderRight={`2px solid ${MainTheme.palette.primary.main}`}
              boxShadow="10px 10px 20px black"
              minHeight={"100vh"}
              height={"100%"}
              zIndex={10}
              position="relative"
            >
              {categoryes.map((category) => (
                <LeftNavigationAccordion
                  key={category._id}
                  category={category}
                />
              ))}
            </Box>
          </Grid>
          <Grid sx={{ padding: 5 }} size={10}>
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
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
