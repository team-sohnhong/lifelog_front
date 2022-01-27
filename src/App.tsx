import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import Question from "./components/Question";
import QuestionWrite from "./components/QuestionWrite";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar />
        {/* 이렇게 해야 앱바 전체 적용 된다*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="write" element={<QuestionWrite />} />
          <Route path="question/:id" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;
