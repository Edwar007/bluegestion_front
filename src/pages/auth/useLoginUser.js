// src/pages/auth/useLoginUser.js
import { useState } from "react";
import { jwtDecode } from "jwt-decode";


export const useLoginUser = () => {
  const [message, setMessage] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const baseUrlFront = process.env.REACT_APP_BASE_URL_FRONT;
  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Guardar el token en localStorage
        localStorage.setItem("token", data.token);

        // (Opcional) Decodificar para obtener el userId y guardarlo si lo necesitas
        const decoded = jwtDecode(data.token); // 👈
        localStorage.setItem("userId", decoded.userId); // 👈

        // Redireccionar
        window.location.href = `${baseUrlFront}/home`;
      } else {
        setMessage("Correo o contraseña incorrectos");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor");
    }
  };

  return { handleLogin, message };
};
