import { Box, Typography, Badge } from "@mui/material";

import { StyledHeader, LinkStyle } from "./StyledHeader";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MainTheme from "@/theme/mainTheme";
import { ContainerFixed } from "../Container/Container";
import { HeaderSizes } from "@/service/suportStyles";
import { useBasketSize } from "@/redux/selectors";

export default function Header() {
  const basketSize = useBasketSize();
  return (
    <StyledHeader component="header">
      <ContainerFixed>
        <Box
          display="flex"
          component="nav"
          justifyContent="space-between"
          sx={{
            height: HeaderSizes,
          }}
        >
          <Box
            display="flex"
            sx={{
              height: "100%",
              gap: {
                desctop: MainTheme.spacing(3),
                tablet: MainTheme.spacing(2),
              },
            }}
          >
            <Link style={LinkStyle} href="/">
              <Typography variant={"link"}>Доставка та оплата</Typography>
            </Link>
            <Link style={LinkStyle} href="/">
              <Typography variant={"link"}>Примірка та обмін</Typography>
            </Link>
            <Link style={LinkStyle} href="/">
              <Typography variant={"link"}>Контакти</Typography>
            </Link>
          </Box>
          <Box
            display="flex"
            sx={{
              height: "100%",
              gap: {
                desctop: MainTheme.spacing(3),
                tablet: MainTheme.spacing(2),
              },
            }}
          >
            <Link style={LinkStyle} href="/">
              <FavoriteBorderIcon
                color="primary"
                sx={{
                  fontSize: {
                    desctop: "32px",
                    tablet: "24px",
                  },
                }}
              />
            </Link>
            <Link style={LinkStyle} href="/itemsList/ordererd">
              <Badge
                sx={{
                  "& .MuiBadge-badge": {
                    top: 5,
                  },
                }}
                color="primary"
                badgeContent={basketSize}
              >
                <ShoppingCartIcon
                  color="primary"
                  sx={{
                    fontSize: {
                      desctop: "32px",
                      tablet: "24px",
                    },
                  }}
                />
              </Badge>
            </Link>
          </Box>
        </Box>
      </ContainerFixed>
    </StyledHeader>
  );
}
