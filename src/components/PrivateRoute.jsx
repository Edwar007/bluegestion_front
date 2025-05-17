import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const { exp } = jwtDecode(token);
    const isExpired = Date.now() >= exp * 1000;

    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }

  return children;
};
