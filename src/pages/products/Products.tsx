import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import CardsSelecProduct from "./CardsProduct";
import "./Products.css";


const Products: React.FC = () => {
  return (
    <MainLayout title="Crear Orden">
      <div className="order-wrapper">
        <div className="order-left">       
          <CardsSelecProduct /> 
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;