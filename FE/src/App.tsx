import "rodal/lib/rodal.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Profile from "./pages/Profile";
import { Room } from "./pages/Room";
import { AnimatePresence } from "framer-motion";
import { MainLayout } from "./layouts/MainLayout";
import { WebSocketProvider } from "./context/socketContext";
import Game from "./pages/Game";
import { Result } from "./pages/Result";
import { Shop } from "./pages/Shop";
import { AccessTokenProvider } from "./context/accessTokenContext";
import { RoomSettingProvider } from "./context/roomSettingContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AccessTokenProvider>
          <WebSocketProvider>
            <RoomSettingProvider>
              <AnimatePresence>
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
                      <Route path="/shop" element={<Shop />} />
                    </Route>
                    <Route element={<PrivateRoute requireAuth={true} />}>
                      <Route path="/room/:roomCode" element={<Room />} />
                    </Route>
                    <Route element={<PrivateRoute requireAuth={true} />}>
                      <Route path="/game" element={<Game />} />
                    </Route>
                    <Route element={<PrivateRoute requireAuth={true} />}>
                      <Route path="/result" element={<Result />} />
                    </Route>
                  </Routes>
                </MainLayout>
              </AnimatePresence>
            </RoomSettingProvider>
          </WebSocketProvider>
        </AccessTokenProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
