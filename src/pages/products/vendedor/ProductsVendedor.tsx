import React, { useState } from "react";
import CardsSelecProduct from "./CardsProductVendedor";
import MainLayoutVendedor from "../../../components/MainLayoutVendedor";
import "../Products.css";

const ProductsVendedor: React.FC = () => {
  return (
    <MainLayoutVendedor title="Crear Orden">
      <div className="order-wrapper">
        <div className="order-left">       
          <CardsSelecProduct /> 
        </div>
      </div>
    </MainLayoutVendedor>
  );
};

export default ProductsVendedor;