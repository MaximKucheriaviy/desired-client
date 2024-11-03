import { Button, Box, Typography } from "@mui/material";
import Header from "@/Components/Header/Header";
import Image from "next/image";
import MainTheme from "@/theme/mainTheme";
import { HeaderSizes } from "@/service/suportStyles";
import { ContainerFixed } from "@/Components/Container/Container";
import { getCategories } from "@/service/api";
import Link from "next/link";
import Grid from "@mui/material/Grid2";

export const getStaticProps = async () => {
  try {
    const categories = await getCategories();
    return {
      props: {
        categories: [...categories, { _id: "111", name: "Новинки" }],
      },
    };
  } catch (err) {
    return {
      props: {
        categories: [],
      },
    };
  }
};

export default function Home({ categories = [] }) {
  return (
    <>
      <Header />
      <Box component="main">
        <Box
          component={"section"}
          display="flex"
          justifyContent="space-around"
          sx={{
            paddingTop: HeaderSizes,
            background: `linear-gradient(160deg, ${MainTheme.palette.primary.main} 0%,${MainTheme.palette.primary.dark} 100%);`,
          }}
        >
          <Box width={"40%"}>
            <Image src="/logo1.png" width={904} height={400} />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            width={"50%"}
          >
            <Typography
              sx={{ textAlign: "center" }}
              chomponent="h1"
              variant="h1"
            >
              Desired
            </Typography>
            <Typography sx={{ textAlign: "center" }} variant="subtitle">
              Ваш ідеальний вибір для комфорту та стилю
            </Typography>
          </Box>
        </Box>
        <Box sx={{ boxShadow: "0px -7px 20px black" }} component={"section"}>
          <ContainerFixed>
            <Grid
              sx={{
                height: HeaderSizes,
                width: "100%",
              }}
              variant="nav"
              container
            >
              {categories.map((category, index) => (
                <Grid
                  key={category._id}
                  style={{
                    borderLeft: index === 0 ? `1px solid gold` : "none",
                    borderRight: `1px solid gold`,
                    borderCollapse: "collapse",
                  }}
                  size={2}
                >
                  <Link
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderCollapse: "collapse",
                    }}
                    href="/"
                  >
                    <Typography variant={"category"}>
                      {category.name}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </ContainerFixed>
        </Box>
      </Box>
    </>
  );
}
