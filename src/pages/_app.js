import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import MainTheme from "@/theme/mainTheme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultMode="dark" theme={MainTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
