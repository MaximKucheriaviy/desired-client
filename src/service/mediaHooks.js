import { useMediaQuery, useTheme } from "@mui/material";

export const useScreenSize = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablet"));
  const isTablet = useMediaQuery(theme.breakpoints.down("dectop"));
  if (isSmallScreen) {
    return "mobile";
  } else if (isTablet) {
    return "tablet";
  } else {
    return "desktop";
  }
};
