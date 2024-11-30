import { Box, Typography, Button } from "@mui/material";
import { ContainerFixed } from "../Container/Container";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { StyledGrid } from "./StyledEroticTypeList";
import MainTheme from "@/theme/mainTheme";
import { useRouter } from "next/router";

const topMargins = {
  desctop: "64px",
  tablet: "64px",
  mobile: "32px",
};

export const EroticTypeList = ({ name, subtitle, category }) => {
  const router = useRouter();
  const types = category.types;
  const onMoreButton = () => {
    router.push({
      pathname: "itemsList",
      query: {
        category: category._id,
      },
    });
  };
  return (
    <Box
      sx={{
        marginTop: topMargins,
        paddingBottom: topMargins,
        borderBottom: `1px solid ${MainTheme.palette.darkRed.main}`,
      }}
      variant="section"
    >
      <ContainerFixed>
        <Box>
          <Typography variant="h2" component="h2">
            {name}
          </Typography>
          <Typography>{subtitle}</Typography>
        </Box>

        <Grid
          sx={{
            marginTop: {
              desctop: "32px",
              tablet: "64px",
              mobile: "32px",
            },
          }}
          spacing={3}
          justifyContent="center"
          container
        >
          {types.map((type) => (
            <StyledGrid size={3} key={type._id}>
              <Link
                style={{
                  backgroundImage: `url("${type.url || "./noImage.jpg"}")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "500px",
                  display: "block",

                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                href={{
                  pathname: "itemsList",
                  query: { category: category._id, type: type._id },
                }}
              >
                <Box className="cover"></Box>
                <Typography
                  sx={{
                    position: "relative",
                    zIndex: 3,
                    textAlign: "center",
                    display: "block",
                    padding: {
                      desctop: `0px ${MainTheme.spacing(2)}`,
                      tablet: `0px ${MainTheme.spacing(2)}`,
                      mobile: `0px ${MainTheme.spacing(2)}`,
                    },
                  }}
                  variant="type"
                >
                  {type.name}
                </Typography>
              </Link>
            </StyledGrid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: topMargins }}>
          <Button
            onClick={onMoreButton}
            sx={{ width: "300px" }}
            variant="contained"
          >
            Дивитись більше
          </Button>
        </Box>
      </ContainerFixed>
    </Box>
  );
};
