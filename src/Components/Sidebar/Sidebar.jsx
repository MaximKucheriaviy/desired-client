import { Box, Typography, TextField, Slider } from "@mui/material";
import { LeftNavigationAccordion } from "../LeftNavigationAccordion/LeftNavigationAcordion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainTheme from "@/theme/mainTheme";

export const Sidebar = ({ categoryes, maxPrice = 0, minPrice = 0 }) => {
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
  return (
    <Box
      sx={{ backgroundColor: MainTheme.palette.darkRed.main }}
      borderRight={`2px solid ${MainTheme.palette.primary.main}`}
      boxShadow="10px 10px 20px black"
      minHeight={"100vh"}
      height={"100%"}
      zIndex={10}
      position="relative"
    >
      {categoryes.map((category) => (
        <LeftNavigationAccordion key={category._id} category={category} />
      ))}
      {maxPrice !== minPrice && (
        <Box padding={"10px"}>
          <Typography component={"p"} variant="list">
            Ціна
          </Typography>
          <Box
            flexDirection={{
              desctop: "row",
              tablet: "column",
              mobile: "column",
            }}
            marginTop={"10px"}
            display={"flex"}
            gap={{ desctop: "30px", tablet: "15px", mobile: "15px" }}
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
  );
};
