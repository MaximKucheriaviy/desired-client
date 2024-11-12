import { starndartRequest } from "@/service/standartRequest";
import { CataogCover } from "@/Components/CatalogCover/CatalogCover";
import Image from "next/image";

export async function getServerSideProps(context) {
  const { catRes, categoryes } = await starndartRequest();
  const { query } = context;
  return {
    props: {
      catRes,
      categoryes,
      id: query.id,
    },
  };
}

export default function ItemPage({ catRes, categoryes, id }) {
  return (
    <CataogCover catRes={catRes} categoryes={categoryes}>
      <Box></Box>
    </CataogCover>
  );
}
