import MainTheme from "@/theme/mainTheme";
import { Container } from "@mui/material";
import { useScreenSize } from "@/service/mediaHooks";

export const ContainerFixed = ({ children, full }) => {
  const screenSize = useScreenSize();
  console.log(full);

  return (
    <Container
      sx={{
        paddingLeft: {
          desctop: MainTheme.spacing(2),
          tablet: MainTheme.spacing(2),
          modile: MainTheme.spacing(1),
        },
        paddingRight: {
          desctop: MainTheme.spacing(2),
          tablet: MainTheme.spacing(2),
          modile: MainTheme.spacing(1),
        },
      }}
      maxWidth={full ? "none" : screenSize}
    >
      {children}
    </Container>
  );
};
