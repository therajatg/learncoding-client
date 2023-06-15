import { Routes, Route } from "react-router-dom";
import {
  Home,
  Signup,
  Login,
  History,
  WatchLater,
  Liked,
  Playlist,
  ErrorPage,
  PlayVideo,
  PlaylistVideos,
  PageNotFound,
} from "./pages/index";
import Mockman from "mockman-js";
import { RequiresAuth } from "./RequiresAuth";
import { useAuth } from "./contexts/authContext";
import { Navigate } from "react-router-dom";

export function Router() {
  const { authState } = useAuth();
  const { token } = authState;
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="/test-api" element={<Mockman />} />
      <Route
        path="/history"
        element={
          <RequiresAuth>
            <History />
          </RequiresAuth>
        }
      />
      <Route
        path="/watchLater"
        element={
          <RequiresAuth>
            <WatchLater />
          </RequiresAuth>
        }
      />
      <Route
        path="/liked"
        element={
          <RequiresAuth>
            <Liked />
          </RequiresAuth>
        }
      />

      <Route
        path="/playlist"
        element={
          <RequiresAuth>
            <Playlist />
          </RequiresAuth>
        }
      />

      <Route path="playlist/:playlistId" element={<PlaylistVideos />} />

      <Route path="/tutorial/:videoId" element={<PlayVideo />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/test" element={<Mockman />} />
    </Routes>
  );
}
