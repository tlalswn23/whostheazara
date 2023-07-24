import "rodal/lib/rodal.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Profile from "./pages/Profile";
import { AccessTokenProvider } from "./context/loginContext";
import { Room } from "./pages/Room";
import { AnimatePresence } from "framer-motion";
import { WebSocketProvider } from "./context/socketContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AccessTokenProvider>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoute requireAuth={true} />}>
                <Route path="/lobby" element={<Lobby />} />
              </Route>
              <Route element={<PrivateRoute requireAuth={true} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <WebSocketProvider>
                <Route element={<PrivateRoute requireAuth={true} />}>
                  <Route path="/room" element={<Room />} />
                </Route>
              </WebSocketProvider>
            </Routes>
          </AnimatePresence>
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
