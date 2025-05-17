import Sidebar from "../../components/Sidebar";
import Logo from "../../assets/icons/LogoBlueGestion.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Sidebar />
      <div className="home-container">
        <div className="home-content">
          <img src={Logo} alt="Logo" className="home-logo" />
          <h1 className="home-title">BlueGestion</h1>
          <h2 className="home-subtitle">Gestor de pedidos</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
