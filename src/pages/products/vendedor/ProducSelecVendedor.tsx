import React from "react";
import "../ProducSelec.css";
import { useNavigate } from "react-router-dom";

// Tipado de producto (puedes importarlo si ya lo tienes definido en otro archivo)
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

// Props del componente
interface CartListProps {
  selected: Product[];
  setSelected: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductSelecVendedor: React.FC<CartListProps> = ({ selected, setSelected }) => {
  const navigate = useNavigate();
  const handleVenderProductos = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selected));
    setTimeout(() => {
      navigate("/vender-productos-v");
    }, 100); // le das un pequeño tiempo para guardar
  };
  
  
  const handleIncrement = (id: number) => {
    setSelected((prev) =>
      prev.map((item) =>
        item.id === id && item.amountProduct < item.stock
          ? { ...item, amountProduct: item.amountProduct + 1 }
          : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setSelected((prev) =>
      prev.map((item) =>
        item.id === id && item.amountProduct > 1
          ? { ...item, amountProduct: item.amountProduct - 1 }
          : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setSelected((prev) => prev.filter((item) => item.id !== id));
  };

  const total = selected.reduce(
    (sum, item) => sum + item.amountProduct * item.price,
    0
  );

  return (
    <div className="cart-list">
      <h3>Productos Seleccionados</h3>
      <div className="cart-header">
        <span className="header-product">Producto</span>
        <span className="header-quantity">Cantidad</span>
        <span className="header-price">Precio</span>
        <span className="header-delete">Borrar</span>
      </div>
      <div className="cart-items scrollable">
        {selected.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.imagen}
              className="cart-img"
              alt={item.nameProduct}
            />
            <div className="cart-controls">
              <button
                className="decrement"
                onClick={() => handleDecrement(item.id)}
              >
                −
              </button>
              <span>{item.amountProduct}</span>
              <button
                className="increment"
                onClick={() => handleIncrement(item.id)}
                disabled={item.amountProduct >= item.stock}
              >
                {" "}
                +{" "}
              </button>
            </div>
            <span className="cart-price">
              ${item.amountProduct * item.price}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <button className="checkout-button" onClick={handleVenderProductos}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default ProductSelecVendedor;
