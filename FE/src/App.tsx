import "rodal/lib/rodal.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </CookiesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
