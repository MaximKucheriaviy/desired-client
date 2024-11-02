import { createTheme } from "@mui/material";

let MainTheme = createTheme({
  breakpoints: { values: { mobile: 0, tablet: 768, desktop: 1280 } },
});

MainTheme = createTheme(MainTheme, {
  palette: {
    mode: "dark",
    primary: MainTheme.palette.augmentColor({
      color: {
        main: "#7e1414",
      },
      name: "primary",
    }),
  },
});

export default MainTheme;
