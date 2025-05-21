// src/pages/auth/useLoginUser.js
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useLoginUser = () => {
  const [message, setMessage] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleLogin = async (e, email, password, navigate) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const decoded = jwtDecode(data.token);
        const userId = decoded.userId;

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", userId);

        // Obtener el rol desde el backend
        const res = await fetch(`${baseUrl}/users/${userId}`);
        const userData = await res.json();

        if (userData?.role) {
          localStorage.setItem("role", userData.role);

          // Redireccionar según el rol
          if (userData.role === "Admin") {
            navigate("/home");
          } else if (userData.role === "Vendedor") {
            navigate("/home-v");
          } else {
            setMessage("Rol no autorizado");
          }
        } else {
          setMessage("No se pudo obtener el rol del usuario");
        }
      } else {
        setMessage("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error de conexión con el servidor");
    }
  };

  return { handleLogin, message };
};
