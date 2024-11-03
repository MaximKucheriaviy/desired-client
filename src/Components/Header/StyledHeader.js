import styled from "@emotion/styled";
import { Box } from "@mui/material";
import MainTheme from "@/theme/mainTheme";

export const StyledHeader = styled(Box)`
  box-shadow: 0px 5px 40px black;
  background-color: ${MainTheme.palette.primary.main};
  width: 100%;
  position: fixed;
  z-index: 500;
`;

export const LinkStyle = {
  display: "flex",
  alignItems: "center",
};
