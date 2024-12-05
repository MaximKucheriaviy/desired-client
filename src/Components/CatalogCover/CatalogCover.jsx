import Header from "../Header/Header";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Slider,
} from "@mui/material";
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
import { useState, useEffect } from "react";
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
  const [priceLimits, setPriceLimits] = useState([0, 0]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.minp && router.query.maxp) {
      setPriceLimits([
        Number.parseInt(router.query.minp),
        Number.parseInt(router.query.maxp),
      ]);
    } else {
      setPriceLimits([minPrice, maxPrice]);
    }
  }, [maxPrice, minPrice]);

  const onLowChage = ({ target }) => {
    setPriceLimits((prev) => {
      const n = [...prev];
      n[0] = target.valueAsNumber;
      return n;
    });
  };

  const onHighChange = ({ target }) => {
    setPriceLimits((prev) => {
      const n = [...prev];
      n[1] = target.valueAsNumber;
      return n;
    });
  };

  const onLowChangeFinish = ({ target }) => {
    setPriceLimits((prev) => {
      const n = [...prev];
      n[1] = target.valueAsNumber;
      return n;
    });
    onFinishSlider(target.valueAsNumber, priceLimits[1]);
  };

  const onHighChangeFinish = ({ target }) => {
    setPriceLimits((prev) => {
      const n = [...prev];
      n[1] = target.valueAsNumber;
      return n;
    });
    onFinishSlider(priceLimits[0], target.valueAsNumber);
  };

  const onFinishSlider = (minpN, maxpN) => {
    const { minp, maxp, ...query } = router.query;

    if (minpN > minPrice || maxpN < maxPrice) {
      query.maxp = maxpN;
      query.minp = minpN;
    }
    router.push({ pathname: router.pathname, query });
  };
  console.log(priceLimits);
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
      <NavigationBar
        categories={catRes}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
      <Box componsnt="section">
        <Grid container>
          {!noSearch && (
            <Grid size={{ desctop: 2, tablet: 3 }}>
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
                {maxPrice !== minPrice && (
                  <Box padding={"10px"}>
                    <Typography component={"p"} variant="list">
                      Ціна
                    </Typography>
                    <Box
                      flexDirection={{ desctop: "row", tablet: "column" }}
                      marginTop={"10px"}
                      display={"flex"}
                      gap={{ desctop: "30px", tablet: "15px" }}
                    >
                      <TextField
                        label="від"
                        type="number"
                        size="small"
                        value={priceLimits[0]}
                        onChange={onLowChage}
                        onInput={onLowChangeFinish}
                      />
                      <TextField
                        label="до"
                        type="number"
                        size="small"
                        value={priceLimits[1]}
                        onChange={onHighChange}
                        onInput={onHighChangeFinish}
                      />
                    </Box>
                    <Box padding={"10px"}>
                      <Slider
                        onChangeCommitted={() =>
                          onFinishSlider(priceLimits[0], priceLimits[1])
                        }
                        onChange={(event, newValue) => {
                          setPriceLimits(newValue);
                        }}
                        value={priceLimits}
                        min={minPrice}
                        max={maxPrice}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          )}
          <Grid
            sx={{ padding: 5, minHeight: "60vh" }}
            size={noSearch ? 12 : { desctop: 10, tablet: 9 }}
          >
            {children}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
