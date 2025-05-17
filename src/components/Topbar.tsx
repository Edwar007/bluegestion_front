import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
import avatar from "../assets/icons/avatar.jpg";

interface Props {
  title: string;
}

const Topbar = ({ title }: Props) => {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const toggleDropdown = () => setOpen(!open);

  // Obtención de los datos del usuario (correo)
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      try {
        const response = await fetch(`${baseUrl}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserEmail(data.email);
          setUserRole(data.role);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, [baseUrl]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleConfig = () => {
    navigate("/configuracion");
  };

  return (
    <div className="topbar">
      <h2 className="page-title">{title}</h2>
      <div className="user-info" onClick={toggleDropdown}>
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="user-details">
          <span className="role">{userRole || "Cargando..."}</span>
          <span className="email">{userEmail || "Cargando..."}</span>
        </div>
        <svg
          className={`dropdown-icon ${open ? "rotate" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>

        {open && (
          <div className="dropdown">
            <ul>
              <li onClick={handleConfig}>Configuración</li>
              <li onClick={handleLogout}>Cerrar sesión</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
