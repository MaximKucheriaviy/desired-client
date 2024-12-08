import Link from "next/link";
import { Typography } from "@mui/material";

export const LinkStyle = {
  display: "flex",
  alignItems: "center",
};

export const LinkSet = () => {
  return (
    <>
      <Link style={LinkStyle} href="/itemsList">
        <Typography variant={"link"}>Каталог товарів</Typography>
      </Link>
      <Link style={LinkStyle} href="/">
        <Typography variant={"link"}>Доставка та оплата</Typography>
      </Link>
      <Link style={LinkStyle} href="/">
        <Typography variant={"link"}>Примірка та обмін</Typography>
      </Link>
      <Link style={LinkStyle} href="/">
        <Typography variant={"link"}>Контакти</Typography>
      </Link>
    </>
  );
};
