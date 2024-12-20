import Header from "../Header/Header";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { ContainerFixed } from "../Container/Container";
import Image from "next/image";
import { HeaderSizes } from "@/service/suportStyles";
import SearchIcon from "@mui/icons-material/Search";
import { Footer } from "@/Components/Footer/Footer";
import MainTheme from "@/theme/mainTheme";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid2";
import { ReduxDefLoader } from "../ReduxDefLoader";
import { styleAdaptor } from "@/service/styleAdaptor";
import { Sidebar } from "../Sidebar/Sidebar";
import { MyDrawer } from "../MyDrawer/MyDrawer";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export const CataogCover = ({
  children,
  categoryName = "Desired",
  catRes,
  categoryes,
  noSearch = false,
  maxPrice = 0,
  minPrice = 0,
}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchRef = useRef(null);
  return (
    <>
      <ReduxDefLoader />
      <Header />
      <MyDrawer
        categoryes={categoryes}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
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
          <ContainerFixed full>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={styleAdaptor(
                "flex-start",
                "space-between",
                "space-between"
              )}
              flexDirection={styleAdaptor("column", "row", "row")}
              flexWrap={"wrap"}
              gap={styleAdaptor("10px", "0px", "0px")}
              sx={{
                height: styleAdaptor("150px", "100px", "100px"),
                paddingTop: styleAdaptor("30px", "0px", "0px"),
              }}
            >
              <Box
                display={styleAdaptor("none", "block", "block")}
                width={{ desctop: "120px", tablet: "100px", mobile: "80px" }}
              >
                <Image src="/logo1.png" alt="logo" width={904} height={400} />
              </Box>
              <Typography variant="h2">{categoryName}</Typography>
              <TextField
                inputRef={searchRef}
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                onBlur={() => {
                  if (search.length < 1) {
                    return;
                  }
                  router.push({
                    pathname: "/itemsList",
                    query: { name: search },
                  });
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") {
                    return;
                  }
                  if (search.length < 1) {
                    return;
                  }
                  if (searchRef.current) {
                    searchRef.current.blur();
                  }
                  console.log("here");
                }}
                sx={{ width: styleAdaptor("80%", "auto", "auto") }}
                size="small"
                autoFocus={false}
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
            <Grid
              sx={{ display: styleAdaptor("none", "block", "block") }}
              size={{ desctop: 2, tablet: 3 }}
            >
              <Sidebar
                categoryes={categoryes}
                maxPrice={maxPrice}
                minPrice={minPrice}
              />
            </Grid>
          )}
          <Grid
            sx={{ padding: styleAdaptor(3, 5, 5), minHeight: "60vh" }}
            size={noSearch ? 12 : { desctop: 10, tablet: 9, mobile: 12 }}
          >
            {children}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
