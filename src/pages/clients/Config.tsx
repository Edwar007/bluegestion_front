import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import "./Config.css";

const Config = () => {
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
    <MainLayout title="Configuración">
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

        {/* Permisos */}
        <div className="permissions-box">
          <h3>Permisos</h3>

          <div className="permission-item">
            <strong>Administrador</strong>
            <p>
              Da acceso a todas las funciones excepto la administración de
              suscriptores que solo está disponible para el propietario de la
              cuenta
            </p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </div>

          {[
            {
              title: "Permitir uso del celular personal",
              desc: "Permite al usuario iniciar sesión desde cualquier dispositivo.",
            },
            {
              title: "Ver transacciones de otros usuarios",
              desc: "Le permite ver todos los pedidos y ventas incluidos los de los otros usuarios y el catálogo en línea.",
            },
            {
              title: "Dar descuentos",
              desc: "Permite aplicar descuentos tanto sobre el valor de los productos como sobre el valor total del pedido.",
            },
            {
              title: "Registrar o alterar productos",
              desc: "Permite al usuario editar datos del producto como precio, nombre, descripción y visibilidad en el catálogo.",
            },
            {
              title: "Gestionar stock",
              desc: "Permite cambiar el stock actual de productos y también el stock mínimo.",
            },
          ].map((perm, idx) => (
            <div className="permission-item" key={idx}>
              <strong>{perm.title}</strong>
              <p>{perm.desc}</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Config;
