import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Validar si hay token
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const { exp } = jwtDecode(token);
    const isExpired = Date.now() >= exp * 1000;

    if (isExpired) {
      localStorage.clear();
      return <Navigate to="/login" />;
    }

    // Verificar si el rol es permitido
    if (!allowedRoles || allowedRoles.includes(role)) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    localStorage.clear();
    return <Navigate to="/login" />;
  }
};
