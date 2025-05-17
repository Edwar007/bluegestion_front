import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import axios from "axios";
import "./RegisterProduct.css";

const RegisterProduct = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [nombreProducto, setNombreProducto] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [codigoProducto, setCodigoProducto] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [categorias, setCategorias] = useState<{ id: number; category: string }[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");

  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/categories`);
        setCategorias(response.data.data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };
    fetchCategorias();
  }, []);

  const generarCodigoUnico = (nombre: string) => {
    const base = nombre.trim().toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const random = Math.floor(Math.random() * 10000);
    return `${base}-${random}`;
  };

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!nombreProducto.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!precio || isNaN(Number(precio)) || Number(precio) <= 0) nuevosErrores.precio = "Precio inválido.";
    if (!description.trim()) nuevosErrores.description = "La descripción es obligatoria.";
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) nuevosErrores.stock = "Stock inválido.";
    if (!categoriaSeleccionada) nuevosErrores.categoria = "Selecciona una categoría.";
    if (!imagenPreview) nuevosErrores.imagen = "Selecciona una imagen.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      const file = fileInput?.files?.[0];
      const imageName = file?.name || "default.png";

      const categoria = categorias.find(cat => cat.category === categoriaSeleccionada);
      const categoryId = categoria?.id;

      const data = {
        nameProduct: nombreProducto,
        referenceProduct: codigoProducto,
        amountProduct: parseFloat(precio),
        description,
        stock: parseInt(stock),
        image: `/imagenes/${imageName}`,
        categoryId,
        productionCost: 0,
        stockMin: 0,
        stockControl: false,
        unit: "",
      };

      const response = await axios.post(`${baseUrl}/product/create`, data);
      if (response.data.success) {
        alert("Producto creado correctamente 🎉");
        resetForm();
        navigate("/listado-productos");
      } else {
        alert("Error al crear producto");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Ocurrió un error al registrar el producto.");
    }
  };

  const resetForm = () => {
    setImagenPreview(null);
    setNombreProducto("");
    setPrecio("");
    setDescription("");
    setCodigoProducto("");
    setStock("");
    setCategoriaSeleccionada("");
    setErrores({});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagenPreview(imageUrl);
    }
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.value;
    setNombreProducto(nombre);
    setCodigoProducto(generarCodigoUnico(nombre));
  };

  return (
    <MainLayout title="Registrar Productos">
      <div className="producto-container">
        <form className="producto-form" onSubmit={handleSubmit}>
          <h2>Registro de Producto</h2>

          <div className="box-center-small">
            {imagenPreview ? (
              <img src={imagenPreview} alt="Vista previa" className="preview-img" />
            ) : (
              <p>Imagen de producto</p>
            )}
          </div>

          <div className="form-group">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {errores.imagen && <span className="error-text">{errores.imagen}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre"
              value={nombreProducto}
              onChange={handleNombreChange}
              className={errores.nombre ? "input-error" : ""}
            />
            {errores.nombre && <span className="error-text">{errores.nombre}</span>}
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className={errores.precio ? "input-error" : ""}
            />
            {errores.precio && <span className="error-text">{errores.precio}</span>}
          </div>

          <div className="form-group">
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className={errores.categoria ? "input-error" : ""}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            {errores.categoria && <span className="error-text">{errores.categoria}</span>}
          </div>

          <div className="form-group">
            <textarea
              rows={3}
              placeholder="Descripción del producto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errores.description ? "input-error" : ""}
            />
            {errores.description && <span className="error-text">{errores.description}</span>}
          </div>

          <div className="form-group">
            <input type="text" placeholder="Código único del producto" value={codigoProducto} readOnly />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Stock actual"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={errores.stock ? "input-error" : ""}
            />
            {errores.stock && <span className="error-text">{errores.stock}</span>}
          </div>

          <button type="submit" className="btn-save">Guardar Producto</button>
        </form>
      </div>
    </MainLayout>
  );
};

export default RegisterProduct;
