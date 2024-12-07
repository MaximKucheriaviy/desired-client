import { Box, Typography } from "@mui/material";
import { ContainerFixed } from "../Container/Container";
import { StyledFooter } from "./StyledFooter";
import Grid from "@mui/material/Grid2";
import { styleAdaptor } from "@/service/styleAdaptor";

export const Footer = () => {
  return (
    <StyledFooter
      sx={{
        paddingTop: {
          desctop: "40px",
          tablet: "20px",
          mobile: "20px",
        },
        paddingBottom: {
          desctop: "40px",
          tablet: "20px",
          mobile: "20px",
        },
      }}
      component="footer"
    >
      <ContainerFixed>
        <Box>
          <Grid
            rowGap={1}
            width={styleAdaptor("100%", "400px", "400px")}
            container
          >
            <Grid size={12}>
              <Typography variant="body2">Контакти</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body1">Телефон:</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body1">+380991112233</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body1">e-mail:</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body1">test@gmail.com</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box></Box>
      </ContainerFixed>
    </StyledFooter>
  );
};
