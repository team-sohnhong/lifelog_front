import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import SignIn from "./routes/SignIn"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import WriteQuestion from "./components/WriteQuestion"
import Question from "./components/Question"

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: { main: "#1f1f1f" },
    secondary: { main: "#bb86fc" },
    background: {
      default: "#121212",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/question" element={<WriteQuestion />} />
          <Route path="/question/detail" element={<Question />} />
          {/* id로 바꿀 예정 */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
