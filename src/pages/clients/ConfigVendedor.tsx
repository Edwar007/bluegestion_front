import React, { useEffect, useState } from "react";
import MainLayoutVendedor from "../../components/MainLayoutVendedor";
import "./Config.css";

const ConfigVendedor = () => {
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await res.json();
        setUserData(data);
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
      }
    };

    fetchUserData();
  }, []);

  const displayedOrders = showAllOrders
    ? orders.slice().reverse()
    : orders.slice(-3).reverse();

  return (
    <MainLayoutVendedor title="Configuración">
      <div className="config-container">
        {/* Datos del usuario */}
        <div className="user-box">
          <h3>Datos del usuario</h3>
          <label>Nombre</label>
          <input type="text" value={userData?.name || ""} readOnly />
          <label>Email</label>
          <input type="text" value={userData?.email || ""} readOnly />
          <label>Documento</label>
          <input
            type="text"
            value={`${userData?.typeDocument || ""} ${userData?.document || ""}`}
            readOnly
          />
          <label>Rol</label>
          <input type="text" value={userData?.role || ""} readOnly />
        </div>

        {/* Últimos pedidos */}
        <div className="orders-box">
          <div className="orders-header">
            <h3>{showAllOrders ? "Todos los pedidos" : "Últimos pedidos"}</h3>
            {orders.length > 3 && (
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setShowAllOrders(!showAllOrders);
              }}>
                {showAllOrders ? "Ver menos" : "Ver todos"}
              </a>
            )}
          </div>
          <ul className="orders-list">
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order) => (
                <li key={order.id}>
                  <span>{new Date(order.created_at).toLocaleString()}</span>
                  <span>${order.totalAmount.toLocaleString("es-CO")}</span>
                </li>
              ))
            ) : (
              <li>No hay pedidos recientes</li>
            )}
          </ul>
        </div>
      </div>
    </MainLayoutVendedor>
  );
};

export default ConfigVendedor;
