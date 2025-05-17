import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import "./CreateOrder.css";
import { useNavigate } from "react-router-dom";

import efectivoIcon from "../../assets/icons/efectivo.png";
import creditoIcon from "../../assets/icons/credito.png";
import debitoIcon from "../../assets/icons/debito.png";
import guardarIcon from "../../assets/icons/guardar.png";

interface Product {
  id: number;
  nameProduct: string;
  referenceProduct: string;
  amountProduct: number;
  description: string;
  stock: number;
  categoryId: number;
  categoryName: string;
  price: number;
  imagen: string;
}

type Customer = {
  id: number;
  nameCustomer: string;
  phoneCustomer: string;
  neighborhoodCustomer: string;
  address: string;
  email: string;
  branch: {
    nameBranch: string;
    phoneBranch: string;
    address: string;
    nameContact: string;
  };
};

const CreateOrder = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showCustomerList, setShowCustomerList] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [observations, setObservations] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;


  const handleDevolver = () => {
    navigate("/crear-orden");
  };

  useEffect(() => {
    const stored = localStorage.getItem("selectedProducts");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSelectedProducts(parsed);
      const totalCalc = parsed.reduce(
        (sum: number, item: Product) => sum + item.amountProduct * item.price,
        0
      );
      setTotal(totalCalc);
    }
  }, []);

  const handleOpenClientList = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/customer/customers`
      );
      const result = await response.json();
      if (result.success) {
        setCustomers(result.data);
        setShowCustomerList(true);
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerList(false);
  };

  const handleGuardarPedido = async () => {
    if (!selectedCustomer || selectedProducts.length === 0 || !paymentMethod) {
      alert("Faltan datos obligatorios");
      return;
    }

    // Generar código automático de orden
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceOrder = `ORD-2025-${randomSuffix}`;

    const userId = localStorage.getItem("userId");

    const orderData = {
      referenceOrder,
      totalAmount: total,
      customerId: selectedCustomer.id,
      userId : userId,
      productIds: selectedProducts.map((p) => ({
        productId: p.id,
        cant: p.amountProduct,
      })),
    };

    try {
      const response = await fetch(`${baseUrl}/order/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Pedido guardado correctamente.");
        localStorage.removeItem("selectedProducts");
        navigate("/listado-ordenes");
      } else {
        alert("Hubo un error al guardar el pedido.");
      }
    } catch (error) {
      console.error("Error al guardar pedido:", error);
    }
  };

  return (
    <MainLayout title="Vender">
      <div className="vender-productos-container">
        {showCustomerList && (
          <div className="modal-overlay">
            <div className="modal-content enhanced-modal">
              <h3 className="modal-title">Selecciona un Cliente</h3>
              <ul className="customer-list">
                {customers.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => handleSelectCustomer(c)}
                    className="customer-item"
                  >
                    <span className="customer-name">{c.nameCustomer}</span>
                    <span className="customer-email">{c.email}</span>
                  </li>
                ))}
              </ul>
              <button
                className="close-modal-btn"
                onClick={() => setShowCustomerList(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Lado izquierdo */}
        <div className="left-section">
          <div className="field-container">
            <label className="field-title">Cliente</label>
            <div className="input-box cliente-box">
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={selectedCustomer?.nameCustomer || ""}
                readOnly
              />
              <button
                className="add-client-button"
                onClick={handleOpenClientList}
              >
                <span className="plus-icon">+</span>
              </button>
            </div>
          </div>

          <div className="field-container">
            <label className="field-title">Observaciones</label>
            <div className="input-box">
              <textarea
                placeholder="Agregar observaciones"
                rows={4}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </div>
          </div>

          <div className="field-container">
            <label className="field-title">Ítems</label>
            <div className="input-box">
              <div className="items-list scrollable">
                {selectedProducts.length === 0 ? (
                  <p>No hay productos seleccionados.</p>
                ) : (
                  selectedProducts.map((product) => (
                    <div key={product.id} className="item-row">
                      <img
                        src={product.imagen}
                        alt={product.nameProduct}
                        className="item-image"
                      />
                      <span className="item-column">{product.nameProduct}</span>
                      <span className="item-column">
                        Cantidad: {product.amountProduct}
                      </span>
                      <span className="item-column">
                        Precio: ${product.price}
                      </span>
                      <span className="item-column">
                        Total: ${product.amountProduct * product.price}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="right-section">
          <h2 className="summary-title">Resumen del Pedido</h2>

          <div className="field-container">
            <div className="input-box">
              <div className="total-container">
                <span className="total-text">Total:</span>
                <span className="total-price">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="payment-type">
            <h3 className="section-title">Forma de Pago</h3>

            <div className="payment-option">
              <input
                type="radio"
                name="pago"
                id="pago-efectivo"
                value="Efectivo"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img src={efectivoIcon} alt="Efectivo" className="payment-img" />
              <label htmlFor="pago-efectivo">Efectivo</label>
            </div>

            <div className="payment-option">
              <input
                type="radio"
                name="pago"
                id="pago-credito"
                value="Crédito"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img
                src={creditoIcon}
                alt="Tarjeta Crédito"
                className="payment-img"
              />
              <label htmlFor="pago-credito">Tarjeta Crédito</label>
            </div>

            <div className="payment-option">
              <input
                type="radio"
                name="pago"
                id="pago-debito"
                value="Débito"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img
                src={debitoIcon}
                alt="Tarjeta Débito"
                className="payment-img"
              />
              <label htmlFor="pago-debito">Tarjeta Débito</label>
            </div>
          </div>

          <div className="action-buttons">
            <button className="discard" onClick={handleDevolver}>
              Descartar Venta
            </button>
            <button className="save">
              <img src={guardarIcon} alt="Guardar" className="button-icon" />
              Guardar Pedido
            </button>
            <button className="finalize" onClick={handleGuardarPedido}>
              $ Finalizar Venta
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateOrder;
