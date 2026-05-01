import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./application/redux/store";
import { lightTheme } from "./presentation/themes/light";
import { darkTheme } from "./presentation/themes/dark";
import AppRoutes from "./application/config/routes";

function App() {
  const themeMode = useSelector((state: RootState) => state.ui?.theme || "light");
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
