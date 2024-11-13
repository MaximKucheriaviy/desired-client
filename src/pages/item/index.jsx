import { starndartRequest } from "@/service/standartRequest";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import { getItemByID } from "@/service/api";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { catRes, categoryes } = await starndartRequest();
  const { query } = context;
  const item = await getItemByID(query.id);
  return {
    props: {
      catRes,
      categoryes,
      item,
    },
  };
}

export default function ItemPage({ catRes, categoryes, item }) {
  const [imagePath, setImagePath] = useState(item.image.url || "/noImage.jpg");
  return (
    <CataogCover catRes={catRes} categoryes={categoryes}>
      <Paper sx={{ backgroundColor: "transparent" }}>
        <Box padding={1}>
          <Typography variant="body2">{item.name}</Typography>
          <Grid container>
            <Grid size={6}>
              <Box width={"350px"} sx={{ aspectRatio: "9 / 16" }}>
                <Image
                  style={{ height: "100%", objectFit: "cover" }}
                  src={imagePath}
                  alt="main"
                  width={350}
                  height={400}
                />
              </Box>
            </Grid>
            <Grid size={6}></Grid>
          </Grid>
        </Box>
      </Paper>
    </CataogCover>
  );
}
