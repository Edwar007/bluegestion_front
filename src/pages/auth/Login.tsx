import { useState } from "react";
import Logo from "../../assets/icons/LogoBlueGestion.png";
import "../auth/Login.css";
import { useRegisterUser } from "./useRegisterUser";
import { useLoginUser } from "./useLoginUser";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    formData,
    handleChange,
    handleRegister,
    message: registerMessage,
  } = useRegisterUser();

  const { handleLogin, message: loginMessage } = useLoginUser();

  const handleSuccessRegister = () => {
    setIsRegistering(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    const numbersRegex = /^[0-9]+$/;

    if (isRegistering) {
      const {
        name,
        document,
        typeDocument,
        typeUser,
        email,
        password,
        confirmPassword,
      } = formData;

      if (!nameRegex.test(name)) {
        alert("El nombre solo debe contener letras y espacios.");
        return;
      }

      if (!numbersRegex.test(document) || parseInt(document) < 0) {
        alert("El número de documento debe ser un número positivo y sin letras.");
        return;
      }

      if (!typeDocument) {
        alert("Selecciona un tipo de documento.");
        return;
      }

      if (!typeUser) {
        alert("Selecciona un tipo de usuario.");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("Correo electrónico no válido.");
        return;
      }

      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      handleRegister(e, handleSuccessRegister);

    } else {
      const { email, password } = formData;

      if (!emailRegex.test(email)) {
        alert("Correo electrónico no válido.");
        return;
      }

      if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      handleLogin(e, email, password);
    }
  };

  const message = isRegistering ? registerMessage : loginMessage;

  return (
    <div className="auth-wrapper">
      <div className={`auth-container ${isRegistering ? "register-mode" : ""}`}>
        {/* Panel Izquierdo */}
        <div className="auth-panel left-panel">
          <div className="panel-content">
            <img src={Logo} alt="Logo" className="logo" />
            <h2>{isRegistering ? "Bienvenido de nuevo" : "Bienvenidos"}</h2>
            <p>
              {isRegistering
                ? "¿Ya tienes una cuenta?"
                : "¿No tienes una cuenta?"}
            </p>
            <button
              className={`switch-btn ${
                isRegistering ? "login-btn" : "register-btn"
              }`}
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Iniciar sesión" : "Registrarse"}
            </button>
          </div>
        </div>

        {/* Panel Derecho */}
        <div className="auth-panel right-panel">
          <div className="form-content">
            <h2>{isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}</h2>

            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    pattern="[A-Za-zÀ-ÿ\s]+"
                    title="Solo letras y espacios"
                    required
                  />

                  <select
                    name="typeDocument"
                    value={formData.typeDocument}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona tipo de documento</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>

                  <input
                    type="text"
                    name="document"
                    placeholder="Número de documento"
                    value={formData.document}
                    onChange={handleChange}
                    pattern="[0-9]+"
                    title="Solo números positivos"
                    required
                  />

                  <select
                    name="typeUser"
                    value={formData.typeUser}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona tipo de usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                  </select>
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {isRegistering && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              )}

              {!isRegistering && (
                <a href="#" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              )}

              <button type="submit" className="submit-btn">
                {isRegistering ? "Registrarse" : "Iniciar sesión"}
              </button>

              {message && <p className="message">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
