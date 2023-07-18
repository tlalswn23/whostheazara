import "rodal/lib/rodal.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
