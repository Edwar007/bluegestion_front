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
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);
        localStorage.setItem("userId", decoded.userId);

        // Redirección correcta con React Router
        navigate("/home");
      } else {
        setMessage("Correo o contraseña incorrectos");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor");
    }
  };

  return { handleLogin, message };
};

