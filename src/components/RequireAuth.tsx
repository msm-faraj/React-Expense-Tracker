import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContextType } from "../types/auth";

const RequireAuth = () => {
  const { auth } = useAuth() as AuthContextType;
  const location = useLocation();

  return auth?.accessToken ? (
    <Navigate to="/api/home"></Navigate>
  ) : (
    <Navigate to="api/login"></Navigate>
  );
};
export default RequireAuth;
