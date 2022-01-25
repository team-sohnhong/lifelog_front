import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Question from "./components/Question"
import WriteQuestion from "./components/QuestionWrite"
import Home from "./routes/Home"
import SignIn from "./routes/SignIn"

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: { main: "#1f1f1f" },
    secondary: { main: "#bb86fc" },
    background: {
      default: "#121212",
    },
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/write" element={<WriteQuestion />} />
          <Route path="/question/:id" element={<Question />} />
          {/* id로 바꿀 예정 */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
