import { Sidebar } from "../Sidebar/Sidebar";
import { useDrawer } from "@/redux/selectors";
import { useDispatch } from "react-redux";
import { closeDrawer } from "@/redux/slices";
import { Drawer, Box } from "@mui/material";
import MainTheme from "@/theme/mainTheme";
import { LinkSet } from "../LinkSet/LinkSet";
import Image from "next/image";

export const MyDrawer = ({ categoryes, maxPrice, minPrice }) => {
  const drawerState = useDrawer();
  const dispatch = useDispatch();
  return (
    <Drawer
      onClose={() => dispatch(closeDrawer())}
      anchor="left"
      open={drawerState}
    >
      <Box
        sx={{ backgroundColor: MainTheme.palette.darkRed.main }}
        borderRight={`2px solid ${MainTheme.palette.primary.main}`}
        zIndex={10}
        position="relative"
        padding={"10px"}
      >
        <Box width={{ desctop: "120px", tablet: "100px", mobile: "80px" }}>
          <Image src="/logo1.png" alt="logo" width={904} height={400} />
        </Box>
      </Box>
      <Box
        sx={{ backgroundColor: MainTheme.palette.darkRed.main }}
        borderRight={`2px solid ${MainTheme.palette.primary.main}`}
        zIndex={10}
        position="relative"
        display={"flex"}
        flexDirection={"column"}
        gap={"30px"}
        padding={"10px"}
      >
        <LinkSet />
      </Box>
      <Sidebar
        categoryes={categoryes}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
    </Drawer>
  );
};
