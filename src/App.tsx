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

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/crear-orden" element={<PrivateRoute><CreateOrder /></PrivateRoute>} />
        <Route path="/registrar-productos" element={<PrivateRoute><RegistrarProductos /></PrivateRoute>} />
        <Route path="/registrar-clientes" element={<PrivateRoute><RegistrarClientes /></PrivateRoute>} />
        <Route path="/vender-productos" element={<PrivateRoute><VenderProductos /></PrivateRoute>} />
        <Route path="/listado-ordenes" element={<PrivateRoute><ListadoOrdenes /></PrivateRoute>} />
        <Route path="/listado-productos" element={<PrivateRoute><ListadoProductos /></PrivateRoute>} />
        <Route path="/listado-clientes" element={<PrivateRoute><ListadoClientes /></PrivateRoute>} />
        <Route path="/listado-usuarios" element={<PrivateRoute><ListadoUsuarios /></PrivateRoute>} />
        <Route path="/configuracion" element={<PrivateRoute><Config /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
