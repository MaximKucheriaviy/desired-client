import { Box, Container, Button } from "@mui/material";
import { useScreenSize } from "@/service/mediaHooks";

export default function Header() {
  const screenSize = useScreenSize();

  return (
    <Box component="header">
      <Container maxWidth={screenSize}>
        <Button variant="contained">Нова кнопка</Button>
      </Container>
    </Box>
  );
}
