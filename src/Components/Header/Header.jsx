import { Box, Typography, Badge } from "@mui/material";
import { StyledHeader, LinkStyle } from "./StyledHeader";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MainTheme from "@/theme/mainTheme";
import { ContainerFixed } from "../Container/Container";
import { HeaderSizes } from "@/service/suportStyles";
import { useBasketSize } from "@/redux/selectors";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/redux/slices";
import { styleAdaptor } from "@/service/styleAdaptor";
import { LinkSet } from "../LinkSet/LinkSet";

export default function Header() {
  const dispatch = useDispatch();
  const basketSize = useBasketSize();
  return (
    <StyledHeader component="header">
      <ContainerFixed full>
        <Box
          display="flex"
          component="nav"
          justifyContent="space-between"
          sx={{
            height: HeaderSizes,
          }}
        >
          <Box
            display={styleAdaptor("none", "flex", "flex")}
            sx={{
              height: "100%",
              gap: {
                desctop: MainTheme.spacing(3),
                tablet: MainTheme.spacing(2),
              },
            }}
          >
            <LinkSet />
          </Box>

          <Box
            display={styleAdaptor("block", "none", "none")}
            sx={{
              height: "100%",
              gap: {
                desctop: MainTheme.spacing(3),
                tablet: MainTheme.spacing(2),
              },
            }}
          >
            <button
              onClick={() => dispatch(openDrawer())}
              style={{
                border: "none",
                backgroundColor: "transparent",
                display: "block",
                height: "100%",
              }}
            >
              <MenuIcon
                color="primary"
                sx={{
                  fontSize: {
                    desctop: "32px",
                    tablet: "24px",
                    mobile: "32px",
                  },
                }}
              />
            </button>
          </Box>

          <Box
            display="flex"
            sx={{
              height: "100%",
              gap: {
                desctop: MainTheme.spacing(3),
                tablet: MainTheme.spacing(2),
                mobile: MainTheme.spacing(1),
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
                    mobile: "32px",
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
                      mobile: "32px",
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
