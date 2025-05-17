import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./MainLayout.css"; // 👈 Asegúrate de importar

interface Props {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title = "Página" }: Props) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar title={title} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
