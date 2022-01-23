import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import SignIn from "./routes/SignIn"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/addQuestion" element={< />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
