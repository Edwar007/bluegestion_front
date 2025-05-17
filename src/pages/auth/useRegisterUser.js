import { useState } from "react";

export const useRegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    document: "",
    typeDocument: "",
    typeUser: "", // admin o cliente
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e, onSuccess) => {
    e.preventDefault();

    const { password, confirmPassword, typeUser, ...rest } = formData;

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    const payload = {
      ...rest,
      password,
      typeUserId: typeUser === "admin" ? "1" : "2",
    };
    const baseUrl = process.env.REACT_APP_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registro exitoso");

        // Limpiar formulario
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          document: "",
          typeDocument: "",
          typeUser: "",
          message: ""
        });

        // Llamar callback si se pasa
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } else {
        setMessage(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor");
    }
  };

  return {
    formData,
    handleChange,
    handleRegister,
    message,
    setFormData,
  };
};
