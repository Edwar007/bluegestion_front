import { Link } from "react-router-dom";
import clientesIcon from "../assets/icons/Clientes.png";
import configIcon from "../assets/icons/Configuracion.png";
import ordenIcon from "../assets/icons/Crear Orden.png";
import lineasIcon from "../assets/icons/Lineas.png";
import pedidosIcon from "../assets/icons/Pedidos.png";
import producIcon from "../assets/icons/Productos.png";
import usuariosIcon from "../assets/icons/Usuarios.png";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul> {/* ✅ Aquí empieza la lista */}
          <li>
            <Link to="/home">
              <div className="sidebar-item">
                <img src={lineasIcon} alt="Lineas" />
                <span>Inicio</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/crear-orden">
              <div className="sidebar-item">
                <img src={ordenIcon} alt="CrearOrden" />
                <span>Crear Orden</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/listado-ordenes">
              <div className="sidebar-item">
                <img src={pedidosIcon} alt="Pedidos" />
                <span>Ordenes</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/listado-productos">
              <div className="sidebar-item">
                <img src={producIcon} alt="Productos" />
                <span>Productos</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/listado-clientes">
              <div className="sidebar-item">
                <img src={clientesIcon} alt="Clientes" />
                <span>Clientes</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/listado-usuarios">
              <div className="sidebar-item">
                <img src={usuariosIcon} alt="Usuarios" />
                <span>Usuarios</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/configuracion">
              <div className="sidebar-item">
                <img src={configIcon} alt="configuracion" />
                <span>Configuración</span>
              </div>
            </Link>
          </li>
        </ul> {/* ✅ Aquí termina la lista */}
      </nav>
    </div>
  );
};

export default Sidebar;


