import { createTheme } from "@mui/material";

let MainTheme = createTheme({
  breakpoints: {
    values: { mobile: 380, tablet: 768, desctop: 1280 },
  },
});

MainTheme = createTheme(MainTheme, {
  palette: {
    mode: "dark",
    primary: MainTheme.palette.augmentColor({
      color: {
        main: "#610f0f",
        dark: "#3d0a0a",
      },
      name: "primary",
    }),
    gold: MainTheme.palette.augmentColor({
      color: {
        main: "#ffd700",
        light: "#ebebeb",
      },
      name: "gold",
    }),
    imageText: MainTheme.palette.augmentColor({
      color: {
        main: "#8a1818",
      },
      name: "gold",
    }),
  },
});

MainTheme = createTheme(MainTheme, {
  typography: {
    link: {
      color: MainTheme.palette.gold.main,
      ["&:hover"]: {
        color: MainTheme.palette.gold.light,
      },
      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "16px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "20px",
      },
    },
    category: {
      color: MainTheme.palette.gold.main,
      fontWeight: "300",
      fontStyle: "italic",
      ["&:hover"]: {
        color: MainTheme.palette.gold.light,
      },
      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "20px",
      },
    },
    type: {
      color: MainTheme.palette.imageText.main,
      textShadow: "0px 0px 7px white",
      fontWeight: "300",
      fontStyle: "italic",
      ["&:hover"]: {
        color: MainTheme.palette.imageText.dark,
      },
      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 800,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "30px",
      },
    },
    h1: {
      fontFamily: ["cursive", "Great Vibes"],
      color: MainTheme.palette.gold.main,
      letterSpacing: "5px",
      textShadow: "7px 7px 10px black",
      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "100px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "170px",
      },
    },
    h2: {
      color: MainTheme.palette.gold.main,
      fontWeight: "400",
      letterSpacing: "3px",
      textShadow: "2px 2px 30px black",
      fontFamily: ["cursive", "Great Vibes"],
      fontWeight: 600,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "36px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "52px",
      },
    },
    subtitle: {
      fontFamily: ["cursive", "Great Vibes"],
      color: MainTheme.palette.gold.main,
      letterSpacing: "5px",
      textShadow: "5px 5px 10px black",
      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "24px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "60px",
      },
    },
    body1: {
      color: MainTheme.palette.gold.main,

      fontWeight: "300",
      fontStyle: "italic",

      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "20px",
      },
    },
    body2: {
      color: MainTheme.palette.gold.main,

      fontWeight: "600",
      fontStyle: "italic",

      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "24px",
      },
    },
    list: {
      color: MainTheme.palette.gold.main,

      fontWeight: "300",
      fontStyle: "italic",

      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "18px",
      },
    },
    list2: {
      color: MainTheme.palette.gold.main,

      fontWeight: "200",
      fontStyle: "italic",

      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "14px",
      },
    },
  },
});

export default MainTheme;
