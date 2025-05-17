import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import "./ListadoUsuarios.css";

interface Seller {
    id: number;
    name: string;
    email: string;
    document: string;
    typeDocument: string;
    role: string;
    orderCount: number;
}

const ListadoUsuarios = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/users/seller`);
                setSellers(response.data);
            } catch (error) {
                console.error("Error al obtener vendedores:", error);
            }
        };

        fetchSellers();
    }, []);

    return (
        <MainLayout title="Usuarios">
            <div className="listado-usuarios-container">
                {/* Filtros arriba */}
                <div className="filtros-barra">
                    {/* Buscador */}
                    <div className="filtros-buscador">
                        <input type="text" placeholder="Buscar por nombre, email o celular..." />
                        <i className="fa fa-search" />
                    </div>

                    {/* Filtro por estado */}
                    <select className="filtro-item">
                        <option value="">Todos los estados</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>

                    {/* Filtro por rol */}
                    <select className="filtro-item">
                        <option value="">Todos los roles</option>
                        <option value="admin">Administrador</option>
                        <option value="vendedor">Vendedor</option>
                        <option value="supervisor">Supervisor</option>
                    </select>

                    {/* Exportar */}
                    <div className="filtro-item exportar">
                        <i className="fa fa-download" />
                        <span>Exportar</span>
                    </div>
                </div>

                {/* Tabla de usuarios */}
                <div className="tabla-contenedor">
                    <table className="usuarios-tabla">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Documento</th>
                                <th>Rol</th>
                                <th>Email</th>
                                <th>Ventas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.map((seller) => (
                                <tr key={seller.id}>
                                    <td>{seller.name}</td>
                                    <td>{seller.document}</td>
                                    <td>{seller.role}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller.orderCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default ListadoUsuarios;
