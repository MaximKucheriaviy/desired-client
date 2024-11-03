import styled from "@emotion/styled";
import Grid from "@mui/material/Grid2";

export const StyledGrid = styled(Grid)`
  box-shadow: 5px 5px 5px black;
  transition-duration: 300ms;
  transition-property: "box-shadow";
  &:hover {
    box-shadow: 5px 5px 30px black;
  }
  border-radius: 20px;
  overflow: hidden;
  & a {
    & .cover {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      transition-duration: 300ms;
      height: 100%;
      width: 100%;
      background-color: white;
      opacity: 0.15;
      &:hover {
        opacity: 0;
      }
    }
  }
`;
