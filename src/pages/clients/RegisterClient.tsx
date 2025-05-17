import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import "./RegisterClient.css";

const RegisterClient = () => {
  const [branches, setBranches] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nameCustomer: "",
    phoneCustomer: "",
    neighborhoodCustomer: "",
    address: "",
    email: "",
    branchId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await fetch(`${baseUrl}/branch/branches`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setBranches(data.data);
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (error) {
        console.error("Error loading branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // limpia error
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nameCustomer.trim()) newErrors.nameCustomer = "El nombre es obligatorio.";
    if (!formData.phoneCustomer.trim()) newErrors.phoneCustomer = "El teléfono es obligatorio.";
    else if (!/^\d{7,10}$/.test(formData.phoneCustomer)) newErrors.phoneCustomer = "Teléfono inválido.";

    if (!formData.neighborhoodCustomer.trim()) newErrors.neighborhoodCustomer = "El barrio es obligatorio.";
    if (!formData.address.trim()) newErrors.address = "La dirección es obligatoria.";

    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Correo inválido.";

    if (!formData.branchId) newErrors.branchId = "Seleccione una sucursal.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const customerData = {
      ...formData,
      branchId: Number(formData.branchId),
    };

    try {
      const res = await fetch(`${baseUrl}/customer/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });

      if (res.ok) {
        setMessage("Cliente registrado exitosamente.");
        setMessageType("success");
        setFormData({
          nameCustomer: "",
          phoneCustomer: "",
          neighborhoodCustomer: "",
          address: "",
          email: "",
          branchId: "",
        });
        setErrors({});
      } else {
        setMessage("Error al registrar cliente.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error al registrar cliente.");
      setMessageType("error");
    }
  };

  return (
    <MainLayout title="Registrar Clientes">
      <div className="cliente-container">
        <form className="cliente-form" onSubmit={handleSubmit}>
          <h2>Registro de Cliente</h2>

          {message && (
            <div className={`mensaje ${messageType}`}>
              {message}
            </div>
          )}

          <div className="form-field">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nameCustomer"
              value={formData.nameCustomer}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
            />
            {errors.nameCustomer && <span className="error">{errors.nameCustomer}</span>}
          </div>

          <div className="form-field">
            <label>Número de teléfono</label>
            <input
              type="text"
              name="phoneCustomer"
              value={formData.phoneCustomer}
              onChange={handleChange}
              placeholder="Ej. 3001234567"
            />
            {errors.phoneCustomer && <span className="error">{errors.phoneCustomer}</span>}
          </div>

          <div className="form-field">
            <label>Barrio</label>
            <input
              type="text"
              name="neighborhoodCustomer"
              value={formData.neighborhoodCustomer}
              onChange={handleChange}
              placeholder="Ej. Chapinero"
            />
            {errors.neighborhoodCustomer && <span className="error">{errors.neighborhoodCustomer}</span>}
          </div>

          <div className="form-field">
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Calle 123 #45-67"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-field">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="cliente@correo.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label>Sucursal</label>
            <select
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
            >
              <option value="">Seleccione Sucursal</option>
              {branches.map(({ id, nameBranch }) => (
                <option key={id} value={id}>
                  {nameBranch}
                </option>
              ))}
            </select>
            {errors.branchId && <span className="error">{errors.branchId}</span>}
          </div>

          <button type="submit" className="btn-guardar">
            Guardar Cliente
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default RegisterClient;
