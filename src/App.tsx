import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";

interface TodolistProps {
  todos: {id: string, text: string}[]
}


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
