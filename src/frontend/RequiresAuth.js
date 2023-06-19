import { useAuth } from "./contexts/authContext";
import { Navigate, useLocation } from "react-router-dom";

export function RequiresAuth({ children }) {
  const location = useLocation();
  const { authState } = useAuth();
  const { accessToken } = authState;

  return accessToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
