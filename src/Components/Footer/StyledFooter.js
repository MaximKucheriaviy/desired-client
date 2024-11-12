import { Box } from "@mui/material";
import MainTheme from "@/theme/mainTheme";
import styled from "@emotion/styled";

export const StyledFooter = styled(Box)`
  box-shadow: 0px 5px 40px black;
  background-color: ${MainTheme.palette.darkRed.main};
  position: relative;
  z-index: 20;
`;
