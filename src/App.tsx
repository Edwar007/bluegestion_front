import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import CreateOrder from "./pages/products/Products";
import RegistrarProductos from "./pages/products/RegisterProduct";
import RegistrarClientes from "./pages/clients/RegisterClient";
import VenderProductos from "./pages/orders/CreateOrder";
import ListadoOrdenes from "./pages/orders/ListOrder";
import ListadoProductos from "./pages/products/ListProducts";
import ListadoClientes from "./pages/clients/ListClient";
import ListadoUsuarios from "./pages/users/ListadoUsuarios";
import Config from "./pages/clients/Config";

import HomeVendedor from "./pages/home/HomeVendedor";
import CreateOrderVendedor from "./pages/products/vendedor/ProductsVendedor";
import VenderProductosVendedor from "./pages/orders/CreateOrderVendedor";
import ConfigVendedor from "./pages/clients/ConfigVendedor";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas vendedor*/}
        <Route path="/home-v" element={<PrivateRoute allowedRoles={["Vendedor"]}><HomeVendedor/></PrivateRoute>} />
        <Route path="/crear-orden-v" element={<PrivateRoute allowedRoles={["Vendedor"]}><CreateOrderVendedor /></PrivateRoute>} />
        <Route path="/vender-productos-v" element={<PrivateRoute allowedRoles={["Vendedor"]}><VenderProductosVendedor /></PrivateRoute>} />
        <Route path="/configuracion-v" element={<PrivateRoute allowedRoles={["Vendedor"]}><ConfigVendedor /></PrivateRoute>} />


        {/* Rutas privadas Administrador */}
        <Route path="/home" element={<PrivateRoute allowedRoles={["Admin"]}><Home /></PrivateRoute>} />
        <Route path="/crear-orden" element={<PrivateRoute allowedRoles={["Admin"]}><CreateOrder /></PrivateRoute>} />
        <Route path="/registrar-productos" element={<PrivateRoute allowedRoles={["Admin"]}><RegistrarProductos /></PrivateRoute>} />
        <Route path="/registrar-clientes" element={<PrivateRoute allowedRoles={["Admin"]}><RegistrarClientes /></PrivateRoute>} />
        <Route path="/vender-productos" element={<PrivateRoute allowedRoles={["Admin"]}><VenderProductos /></PrivateRoute>} />
        <Route path="/listado-ordenes" element={<PrivateRoute allowedRoles={["Admin"]}><ListadoOrdenes /></PrivateRoute>} />
        <Route path="/listado-productos" element={<PrivateRoute allowedRoles={["Admin"]}><ListadoProductos /></PrivateRoute>} />
        <Route path="/listado-clientes" element={<PrivateRoute allowedRoles={["Admin"]}><ListadoClientes /></PrivateRoute>} />
        <Route path="/listado-usuarios" element={<PrivateRoute allowedRoles={["Admin"]}><ListadoUsuarios /></PrivateRoute>} />
        <Route path="/configuracion" element={<PrivateRoute allowedRoles={["Admin"]}><Config /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
