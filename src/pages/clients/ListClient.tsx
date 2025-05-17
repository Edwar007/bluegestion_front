import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import "./ListClient.css";

interface Branch {
  id: string;
  nameBranch: string;
  phoneBranch: string;
  neighborhoodBranch: string;
  address: string;
  nameContact: string;
}

interface Client {
  id: string;
  nameCustomer: string;
  phoneCustomer: string;
  neighborhoodCustomer: string;
  address: string;
  email: string;
  branch: Branch;
}

const ListClient = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${baseUrl}/customer/customers`);
        const data = await res.json();
        if (data.success) {
          setClients(data.data);
        }
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    fetchClients();
  }, [baseUrl]);

  const handleAgregarCliente = () => {
    navigate("/registrar-clientes");
  };

  const handleClickSucursal = (branch: Branch) => {
    setSelectedBranch(branch);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBranch(null);
  };

  return (
    <MainLayout title="Clientes">
      <div className="listado-clientes-container">
        <div className="filtros-barra">
          <div className="filtros-buscador">
            <input
              type="text"
              placeholder="Buscar por nombre, email o celular..."
            />
            <i className="fa fa-search" />
          </div>

          <div className="filtro-item">
            <i className="fa fa-download" />
            <span>Exportar</span>
          </div>

          <button className="boton-agregar" onClick={handleAgregarCliente}>
            <i className="fa fa-plus" /> Agregar Cliente
          </button>
        </div>

        <div className="tabla-contenedor">
          <table className="clientes-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Barrio</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Sucursal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.nameCustomer}</td>
                  <td>{client.phoneCustomer}</td>
                  <td>{client.neighborhoodCustomer}</td>
                  <td>{client.address}</td>
                  <td>{client.email}</td>
                  <td>
                    <span
                      className="sucursal-nombre"
                      onClick={() => handleClickSucursal(client.branch)}
                    >
                      {client.branch.nameBranch}
                    </span>
                  </td>
                  <td>
                    <i className="fa fa-trash icono-borrar" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && selectedBranch && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <h2>Sucursal: {selectedBranch.nameBranch}</h2>
              <p><strong>Teléfono:</strong> {selectedBranch.phoneBranch}</p>
              <p><strong>Barrio:</strong> {selectedBranch.neighborhoodBranch}</p>
              <p><strong>Dirección:</strong> {selectedBranch.address}</p>
              <p><strong>Contacto:</strong> {selectedBranch.nameContact}</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ListClient;
