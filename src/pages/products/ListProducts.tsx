import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import "./ListProducts.css";

interface Category {
  id: number;
  category: string;
}

interface Producto {
  id: number;
  nameProduct: string;
  referenceProduct: string;
  amountProduct: number;
  description: string;
  stock: number;
  image: string;
  created_at: string;
  updated_at: string;
  category?: Category | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const ListProducts = () => {
  const navigate = useNavigate(); // Mover aquí la llamada a useNavigate
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchData = async <T,>(url: string, setter: React.Dispatch<React.SetStateAction<T>>) => {
    try {
      const res = await fetch(url);
      const data: ApiResponse<T> = await res.json();
      if (data.success) {
        setter(data.data);
      }
    } catch (error) {
      console.error(`Error al cargar desde ${url}:`, error);
    }
  };

  const cargarProductos = () => {
    fetchData<Producto[]>(`${baseUrl}/product/products`, setProductos);
  };

  useEffect(() => {
    cargarProductos();
    fetchData<Category[]>(`${baseUrl}/product/categories`, setCategories);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleEliminarClick = (producto: Producto) => {
    setProductoAEliminar(producto);
    setShowModal(true);
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;
    try {
      const response = await fetch(
        `${baseUrl}/product/delete/${productoAEliminar.referenceProduct}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result.success) {
        setShowModal(false);
        setProductoAEliminar(null);
        cargarProductos(); // Refrescar productos
      } else {
        alert("Error al eliminar el producto.");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const filteredProductos = productos.filter((producto) => {
    const name = producto.nameProduct.toLowerCase();
    const ref = producto.referenceProduct.toLowerCase();
    const category = producto.category?.category || "";
    return (
      (name.includes(searchTerm) || ref.includes(searchTerm)) &&
      (!selectedCategory || category === selectedCategory)
    );
  });

  const handleAgregarProducto = () => {
    navigate("/registrar-productos");
  };
 
  return (
    <MainLayout title="Productos">
      <div className="listado-productos-container">
        {/* MODAL DE CONFIRMACIÓN */}
        {showModal && productoAEliminar && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>¿Estás seguro que deseas eliminar el producto "{productoAEliminar.nameProduct}"?</h3>
              <div className="modal-buttons">
                <button onClick={confirmarEliminacion} className="btn-confirmar">
                  Sí, eliminar
                </button>
                <button onClick={() => setShowModal(false)} className="btn-cancelar">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FILTROS */}
        <div className="filtros-barra">
          <div className="filtros-buscador">
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fa fa-search" />
          </div>

          <div className="filtro-item">
            <i className="fa fa-tags" />
            <select
              className="filtro-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-item">
            <i className="fa fa-download" />
            <span>Exportar</span>
          </div>

          <button className="boton-agregar" onClick={handleAgregarProducto}>
            <i className="fa fa-plus" /> Agregar Producto
          </button>
        </div>

        {/* TABLA */}
        <div className="tabla-contenedor">
          <table className="productos-tabla">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Referencia</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Catálogo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.length > 0 ? (
                filteredProductos.map((producto) => (
                  <tr key={producto.id}>
                    <td><input type="checkbox" /></td>
                    <td>{producto.referenceProduct}</td>
                    <td>{producto.nameProduct}</td>
                    <td>{producto.category?.category || "Sin categoría"}</td>
                    <td>{producto.stock}</td>
                    <td>${producto.amountProduct.toLocaleString()}</td>
                    <td>
                      <img
                        src={producto.image}
                        alt={producto.nameProduct}
                        className="producto-imagen"
                      />
                    </td>
                    <td>
                      <button className="boton-editar" onClick={() => handleEliminarClick(producto)}>
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No hay productos disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListProducts;
