import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import Person from "./pages/Person";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/person/:id" element={<Person />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}