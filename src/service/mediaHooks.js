import { useMediaQuery, useTheme } from "@mui/material";

export const useScreenSize = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const desktop = useMediaQuery(theme.breakpoints.up("desctop"));

  if (desktop) {
    return "desctop";
  } else if (isTablet) {
    return "tablet";
  } else {
    return "mobile";
  }
};
