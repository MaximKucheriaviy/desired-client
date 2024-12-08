import { Box, Typography, Drawer } from "@mui/material";
import Header from "@/Components/Header/Header";
import Image from "next/image";
import MainTheme from "@/theme/mainTheme";
import { HeaderSizes } from "@/service/suportStyles";
import { starndartRequest } from "@/service/standartRequest";
import { EroticTypeList } from "@/Components/ErolicTypeList/EroticTypeList";
import { Footer } from "@/Components/Footer/Footer";
import { NavigationBar } from "@/Components/NavigationBar/NavigationBar";
import { ReduxDefLoader } from "@/Components/ReduxDefLoader";
import { styleAdaptor } from "@/service/styleAdaptor";
import { useDispatch } from "react-redux";
import { MyDrawer } from "@/Components/MyDrawer/MyDrawer";

export const getStaticProps = async () => {
  const { categoryes, catRes } = await starndartRequest();
  return {
    props: {
      catRes,
      categoryes,
    },
  };
};

export default function Home({ categoryes = [], catRes }) {
  return (
    <>
      <ReduxDefLoader />
      <Header />
      <MyDrawer categoryes={categoryes} />
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
          flexDirection={styleAdaptor("column", "row", "row")}
          alignItems={"center"}
        >
          <Box width={styleAdaptor("100%", "40%", "40%")}>
            <Image src="/logo1.png" width={904} height={400} />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            width={styleAdaptor("95%", "50%", "50%")}
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
        <NavigationBar categories={catRes} />
        <EroticTypeList
          name="Еротична білизна"
          subtitle="Спокуслива та вишукана еротична білизна для особливих моментів"
          category={categoryes.find(
            (item) => item.category.name === "Еротична білизна"
          )}
        />
        <EroticTypeList
          name="Спідня білизна"
          subtitle="Зручна та стильна спідня білизна для щоденного комфорту"
          category={categoryes.find(
            (item) => item.category.name === "Спідня білизна"
          )}
        />
        <EroticTypeList
          name="Мода"
          subtitle="Актуальні тренди та стильні образи для вашого гардеробу"
          category={categoryes.find((item) => item.category.name === "Мода")}
        />
        <EroticTypeList
          name="Панчохи, колготки"
          subtitle="Елегантні панчохи та колготки для завершення стильного образу"
          category={categoryes.find(
            (item) => item.category.name === "Панчохи, колготки"
          )}
        />
        <EroticTypeList
          name="Купальники"
          subtitle="Яскраві та стильні купальники для відпочинку та розваг"
          category={categoryes.find(
            (item) => item.category.name === "Купальники"
          )}
        />
      </Box>
      <Footer />
    </>
  );
}
