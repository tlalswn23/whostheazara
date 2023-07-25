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
import { MainLayout } from "./layouts/MainLayout";
import { WebSocketProvider } from "./context/socketContext";
import { RoomSettingProvider } from "./context/roomSettingContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AccessTokenProvider>
          <AnimatePresence>
            <WebSocketProvider>
              <RoomSettingProvider>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<PrivateRoute requireAuth={true} />}>
                      <Route path="/lobby" element={<Lobby />} />
                    </Route>
                    <Route element={<PrivateRoute requireAuth={true} />}>
                      <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<PrivateRoute requireAuth={true} />}>
                      <Route path="/room" element={<Room />} />
                    </Route>
                  </Routes>
                </MainLayout>
              </RoomSettingProvider>
            </WebSocketProvider>
          </AnimatePresence>
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
