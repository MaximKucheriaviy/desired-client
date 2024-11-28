import { Box } from "@mui/material";
import MainTheme from "@/theme/mainTheme";

export const FormCover = ({ children }) => {
  return (
    <Box
      sx={{
        border: `1px solid ${MainTheme.palette.primary.main}`,
        padding: "20px",
        borderRadius: "10px",
      }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap="20px"
    >
      {children}
    </Box>
  );
};
