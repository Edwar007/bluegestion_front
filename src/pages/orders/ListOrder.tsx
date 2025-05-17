import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import "./ListOrder.css";
import axios from "axios";

interface Customer {
  nameCustomer: string;
}

interface User {
  name: string;
}

interface Product {
  nameProduct: string;
  amountProduct: number;
  image: string;
}

interface OrderProduct {
  cant: number;
  product: Product;
}

interface Order {
  referenceOrder: string;
  statusOrder: string;
  totalAmount: number;
  created_at: string;
  customer?: Customer;
  user?: User;
}

interface OrderItem {
  order: Order;
  orderProducts: OrderProduct[];
}

interface SelectOption {
  id: number;
  name: string;
}

const ListOrder = () => {
  const navigate = useNavigate();

  const [ordenes, setOrdenes] = useState<OrderItem[]>([]);
  const [productosModal, setProductosModal] = useState<OrderProduct[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [searchCode, setSearchCode] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [clients, setClients] = useState<SelectOption[]>([]);
  const [sellers, setSellers] = useState<SelectOption[]>([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/order/orders`);
        const ordenesData: OrderItem[] = data.data;
        setOrdenes(ordenesData);

        const uniqueClients = Array.from(
          new Set(ordenesData.map(o => o.order.customer?.nameCustomer))
        )
          .filter(Boolean)
          .map((name, i) => ({ id: i, name: name! }));

        const uniqueSellers = Array.from(
          new Set(ordenesData.map(o => o.order.user?.name))
        )
          .filter(Boolean)
          .map((name, i) => ({ id: i, name: name! }));

        setClients(uniqueClients);
        setSellers(uniqueSellers);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrdenes();
  }, []);

  const ordenesFiltradas = useMemo(() => {
    return ordenes.filter(({ order }) => {
      const cliente = order.customer?.nameCustomer || "";
      const vendedor = order.user?.name || "";
      const estado = order.statusOrder.toLowerCase();
      const codigo = order.referenceOrder.toLowerCase();

      return (
        codigo.includes(searchCode.toLowerCase()) &&
        (selectedClient === "" || cliente === selectedClient) &&
        (selectedSeller === "" || vendedor === selectedSeller) &&
        (selectedStatus === "" || estado === selectedStatus.toLowerCase())
      );
    });
  }, [ordenes, searchCode, selectedClient, selectedSeller, selectedStatus]);

  const abrirModalProductos = (productos: OrderProduct[]) => {
    setProductosModal(productos);
    setShowModal(true);
  };

  return (
    <MainLayout title="Órdenes">
      <div className="listado-ordenes-container">
        <div className="filtros-barra">
          <div className="filtros-buscador">
            <input
              type="text"
              placeholder="Buscar por código..."
              className="input-busqueda"
              value={searchCode}
              onChange={e => setSearchCode(e.target.value)}
            />
            <i className="fa fa-search" />
          </div>

          <FiltroSelect
            icon="fa-user"
            value={selectedClient}
            onChange={e => setSelectedClient(e.target.value)}
            options={clients}
            placeholder="Todos los clientes"
          />
          <FiltroSelect
            icon="fa-user-tie"
            value={selectedSeller}
            onChange={e => setSelectedSeller(e.target.value)}
            options={sellers}
            placeholder="Todos los vendedores"
          />
          <FiltroSelect
            icon="fa-check-circle"
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            options={[
              { id: 1, name: "Recibida" },
              { id: 2, name: "Procesado" },
              { id: 3, name: "Cancelado" }
            ]}
            placeholder="Todos los estados"
          />

          <button className="boton-agregar" onClick={() => navigate("/crear-orden")}>
            <i className="fa fa-plus" /> Crear Orden
          </button>
        </div>

        <div className="tabla-ordenes-contenedor">
          <table className="ordenes-tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Items</th>
                <th>Valor</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.map(({ order, orderProducts }, index) => (
                <tr key={index}>
                  <td>{order.referenceOrder}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>{order.customer?.nameCustomer || "Sin cliente"}</td>
                  <td>{order.user?.name || "-"}</td>
                  <td
                    className="ver-productos-link"
                    onClick={() => abrirModalProductos(orderProducts)}
                  >
                    {orderProducts.length} ítems
                  </td>
                  <td>${order.totalAmount.toLocaleString()}</td>
                  <td>
                    <div className={`estado-item ${getEstadoClass(order.statusOrder)}`}>
                      <i className={`fa fa-clock ${getEstadoClass(order.statusOrder)}`} />
                      <span className="estado-texto">{order.statusOrder}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Productos de la Orden</h3>
              <table className="tabla-productos-modal">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                  </tr>
                </thead>
                <tbody>
                  {productosModal.map((prod, idx) => (
                    <tr key={idx}>
                      <td>
                        <img
                          src={prod.product.image}
                          alt={prod.product.nameProduct}
                          className="product-image"
                        />
                      </td>
                      <td>{prod.product.nameProduct}</td>
                      <td>{prod.cant}</td>
                      <td>${prod.product.amountProduct.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="cerrar-modal-btn" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const FiltroSelect = ({
  icon,
  value,
  onChange,
  options,
  placeholder,
}: {
  icon: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption[];
  placeholder: string;
}) => (
  <div className="filtro-item">
    <i className={`fa ${icon}`} />
    <select className="filtro-select" value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.id} value={opt.name}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

const getEstadoClass = (estado: string) => {
  switch (estado.toLowerCase()) {
    case "recibida":
      return "estado-pendiente";
    case "procesado":
      return "estado-confirmado";
    case "cancelado":
      return "estado-cancelado";
    default:
      return "";
  }
};

export default ListOrder;
