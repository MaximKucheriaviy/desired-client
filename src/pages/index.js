import { Box, Typography } from "@mui/material";
import Header from "@/Components/Header/Header";
import Image from "next/image";
import MainTheme from "@/theme/mainTheme";
import { HeaderSizes } from "@/service/suportStyles";

import { getCategories, getTypes } from "@/service/api";
import { EroticTypeList } from "@/Components/ErolicTypeList/EroticTypeList";
import { Footer } from "@/Components/Footer/Footer";
import { NavigationBar } from "@/Components/NavigationBar/NavigationBar";

export const getStaticProps = async () => {
  try {
    const categories = await getCategories();

    for (let i = 0; i < categories.length; i++) {
      categories[i].types = await getTypes(categories[i]._id);
    }

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
            paddingBottom: HeaderSizes,
            paddingTop: HeaderSizes,
            background: `linear-gradient(160deg, ${MainTheme.palette.darkRed.main} 0%,${MainTheme.palette.darkRed.dark} 100%);`,
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
        <NavigationBar categories={categories} />
        <EroticTypeList
          name="Еротична білизна"
          subtitle="Спокуслива та вишукана еротична білизна для особливих моментів"
          types={
            categories.find((item) => item.name === "Еротична білизна").types
          }
        />
        <EroticTypeList
          name="Спідня білизна"
          subtitle="Зручна та стильна спідня білизна для щоденного комфорту"
          types={
            categories.find((item) => item.name === "Спідня білизна").types
          }
        />
        <EroticTypeList
          name="Мода"
          subtitle="Актуальні тренди та стильні образи для вашого гардеробу"
          types={categories.find((item) => item.name === "Мода").types}
        />
        <EroticTypeList
          name="Панчохи, колготки"
          subtitle="Елегантні панчохи та колготки для завершення стильного образу"
          types={
            categories.find((item) => item.name === "Панчохи, колготки").types
          }
        />
        <EroticTypeList
          name="Купальники"
          subtitle="Яскраві та стильні купальники для відпочинку та розваг"
          types={categories.find((item) => item.name === "Купальники").types}
        />
        <Footer />
      </Box>
    </>
  );
}
