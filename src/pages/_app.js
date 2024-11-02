import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import MainTheme from "@/theme/mainTheme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider defaultMode="dark" theme={MainTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
