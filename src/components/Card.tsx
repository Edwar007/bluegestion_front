import React from "react";
import "./Card.css";

// Define las props esperadas
interface CardProps {
  nameProduct: string;
  price: number;
  imagen: string;
  onAdd: () => void;
}

const Card: React.FC<CardProps> = ({ nameProduct, price, imagen, onAdd }) => {
  return (
    <div className="card">
      <img src={imagen} alt={nameProduct} />
      <div className="card-content">
        <div className="card-title">{nameProduct}</div>
      </div>
      <div className="card-footer">
        <div className="price">${price.toLocaleString()}</div>
        <button className="button" onClick={onAdd}>Agregar</button>
      </div>
    </div>
  );
};

export default Card;
