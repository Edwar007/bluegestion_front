import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./MainLayout.css"; // 👈 Asegúrate de importar
import SidebarVendedor from "./Sidebar Vendedor";

interface Props {
  children: ReactNode;
  title?: string;
}

const MainLayoutVendedor = ({ children, title = "Página" }: Props) => {
  return (
    <div className="main-layout">
      <SidebarVendedor />
      <div className="main-content">
        <Topbar title={title} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayoutVendedor;
