import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Layout from "./Layout";

function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuthStore();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
}

export default ProtectedRoute;
