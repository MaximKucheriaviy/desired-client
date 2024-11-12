import { ContainerFixed } from "@/Components/Container/Container";
import Link from "next/link";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { HeaderSizes } from "@/service/suportStyles";
import MainTheme from "@/theme/mainTheme";

export const NavigationBar = ({ categories }) => {
  return (
    <Box
      sx={{
        boxShadow: "0px -7px 20px black",
        position: "relative",
        zIndex: "30",
      }}
      component={"section"}
    >
      <ContainerFixed>
        <Grid
          sx={{
            height: HeaderSizes,
            width: "100%",
          }}
          variant="nav"
          container
        >
          {categories.map((category, index) => (
            <Grid
              key={category._id}
              style={{
                borderLeft:
                  index === 0
                    ? `1px solid ${MainTheme.palette.primary.main}`
                    : "none",
                borderRight: `1px solid ${MainTheme.palette.primary.main}`,
                borderCollapse: "collapse",
              }}
              size={2}
            >
              <Link
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderCollapse: "collapse",
                }}
                href={{
                  pathname: `/itemsList`,
                  query: {
                    category: category._id,
                  },
                }}
              >
                <Typography variant={"category"}>{category.name}</Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </ContainerFixed>
    </Box>
  );
};
