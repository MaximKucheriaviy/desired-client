import { createTheme } from "@mui/material";

let MainTheme = createTheme({
  breakpoints: {
    values: { mobile: 320, tablet: 768, desctop: 1280 },
  },
});

MainTheme = createTheme(MainTheme, {
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 12px", // Общие паддинги для всех ячеек таблицы
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "white", // Цвет текста
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: "black", // Чёрный цвет текста в выпадающем списке
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "black", // Цвет текста в самих опциях
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: MainTheme.palette.augmentColor({
      color: {
        main: "#ffd700",
        light: "#ebebeb",
      },
      name: "primary",
    }),
    darkRed: MainTheme.palette.augmentColor({
      color: {
        main: "#610f0f",
        dark: "#3d0a0a",
      },
      name: "darkRed",
    }),

    imageText: MainTheme.palette.augmentColor({
      color: {
        main: "#8a1818",
      },
      name: "imageText",
    }),
    button: MainTheme.palette.augmentColor({
      color: {
        main: "#8a1818",
        contrastText: "#ffffff",
      },
      name: "imageText",
    }),
    secondary: MainTheme.palette.augmentColor({
      color: {
        main: "#188a7b",
      },
      name: "secondary",
    }),
  },
});

MainTheme = createTheme(MainTheme, {
  typography: {
    link: {
      color: MainTheme.palette.primary.main,
      ["&:hover"]: {
        color: MainTheme.palette.primary.light,
      },
      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "16px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "12px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "20px",
      },
    },
    category: {
      color: MainTheme.palette.primary.main,
      fontWeight: "300",
      fontStyle: "italic",
      ["&:hover"]: {
        color: MainTheme.palette.primary.light,
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
        fontSize: "34px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "24px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "30px",
      },
    },
    h1: {
      fontFamily: ["cursive", "Great Vibes"],
      color: MainTheme.palette.primary.main,
      letterSpacing: "5px",
      textShadow: "7px 7px 10px black",
      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "80px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "100px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "170px",
      },
    },
    h2: {
      color: MainTheme.palette.primary.main,
      fontWeight: "400",
      letterSpacing: "3px",
      textShadow: "2px 2px 30px black",
      fontFamily: ["cursive", "Great Vibes"],
      fontWeight: 600,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "30px",
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
      color: MainTheme.palette.primary.main,
      letterSpacing: "5px",
      textShadow: "5px 5px 10px black",
      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "24px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "24px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "60px",
      },
    },
    body1: {
      color: MainTheme.palette.primary.main,

      fontWeight: "300",
      fontStyle: "italic",

      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "14px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "14px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "16px",
      },
    },
    body2: {
      color: MainTheme.palette.primary.main,

      fontWeight: "600",
      fontStyle: "italic",

      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 400,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "16px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "20px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "24px",
      },
    },
    list: {
      color: MainTheme.palette.primary.main,

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
      color: MainTheme.palette.primary.main,

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
    priceCard: {
      color: MainTheme.palette.imageText.main,

      fontWeight: "600",
      fontStyle: "italic",

      fontFamily: ["sans-serif", "Roboto"],
      fontWeight: 600,

      [MainTheme.breakpoints.up("mobile")]: {
        fontSize: "24px",
      },
      [MainTheme.breakpoints.up("tablet")]: {
        fontSize: "20px",
      },
      [MainTheme.breakpoints.up("desctop")]: {
        fontSize: "28px",
      },
    },
  },
});

export default MainTheme;
