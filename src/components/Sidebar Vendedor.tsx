import { Link } from "react-router-dom";

import configIcon from "../assets/icons/Configuracion.png";
import ordenIcon from "../assets/icons/Crear Orden.png";
import lineasIcon from "../assets/icons/Lineas.png";

import "./Sidebar.css";

const SidebarVendedor = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul> {/* ✅ Aquí empieza la lista */}
          <li>
            <Link to="/home-v">
              <div className="sidebar-item">
                <img src={lineasIcon} alt="Lineas" />
                <span>Inicio</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/crear-orden-v">
              <div className="sidebar-item">
                <img src={ordenIcon} alt="CrearOrden" />
                <span>Crear Orden</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/configuracion-v">
              <div className="sidebar-item">
                <img src={configIcon} alt="Configuracion" />
                <span>Configuración</span>
              </div>
            </Link>
          </li>
        </ul> {/* ✅ Aquí termina la lista */}
      </nav>
    </div>
  );
};

export default SidebarVendedor;


