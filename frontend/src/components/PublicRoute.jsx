import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LoadingSpinner from "./LoadingSpinner";

function PublicRoute({ children }) {
  const { user, authLoading } = useAuthStore();

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PublicRoute;
