import Header from "../Header/Header";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { ContainerFixed } from "../Container/Container";
import Image from "next/image";
import { HeaderSizes } from "@/service/suportStyles";
import SearchIcon from "@mui/icons-material/Search";
import { LeftNavigationAccordion } from "@/Components/LeftNavigationAccordion/LeftNavigationAcordion";
import { Footer } from "@/Components/Footer/Footer";
import MainTheme from "@/theme/mainTheme";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid2";
import { ReduxDefLoader } from "../ReduxDefLoader";

export const CataogCover = ({
  children,
  categoryName = "Desired",
  catRes,
  categoryes,
  noSearch = false,
}) => {
  return (
    <>
      <ReduxDefLoader />
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
          {!noSearch && (
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
          )}
          <Grid
            sx={{ padding: 5, minHeight: "60vh" }}
            size={noSearch ? 12 : 10}
          >
            {children}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
