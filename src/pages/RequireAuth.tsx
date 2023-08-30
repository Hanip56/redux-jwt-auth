import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../app/features/auth/authSlice";

const RequireAuth = () => {
  const { token } = useSelector(selectAuth);

  return token ? <Outlet /> : <Navigate to="/get-started" />;
};

export default RequireAuth;
