import React, { useState } from "react";
import "./SearchFilterSelecProduct.css";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
}

const SearchFilterCrearOrden: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const [isCategoryActive, setIsCategoryActive] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleCategoryDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from closing on inner clicks
    setIsCategoryActive((prev) => !prev);
  };

  const handleCategorySelect = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setIsCategoryActive(false);
  };

  const resetFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm("");
    setSelectedCategory("Categoría");
    setIsCategoryActive(false);
  };

  return (
    <>
      <div className="filtros-barra">
        {/* Buscador por nombre o código */}
        <div className="filtros-buscador">
          <input
            type="text"
            placeholder="Nombre o Código"
            value={searchTerm}
            onChange={handleSearchChange}
            className="input-busqueda"
            aria-label="Buscar producto por nombre o código"
          />
          <i className="fa fa-search" />
        </div>

        {/* Selector de categoría (con dropdown personalizado) */}
        <div
          className={`filtro-item ${isCategoryActive ? "active" : ""}`}
          onClick={toggleCategoryDropdown}
          aria-expanded={isCategoryActive}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <i className="fa fa-folder" />
          <span>
            {selectedCategory === "Categoría"
              ? "Todas las categorías"
              : selectedCategory}
          </span>
          <i className="fa fa-chevron-down" />
          {isCategoryActive && (
            <ul
              className="category-options"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 10,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "0.5rem",
                listStyle: "none",
                width: "max-content",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <li onClick={(e) => handleCategorySelect("Categoría", e)}>
                Todas las categorías
              </li>
              {categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={(e) => handleCategorySelect(cat, e)}
                  style={{ cursor: "pointer", padding: "4px 8px" }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Botón de restablecer filtros */}
        <div
          className="filtro-item"
          onClick={resetFilters}
          title="Restablecer filtros"
          aria-label="Restablecer filtros"
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-bars" />
        </div>
      </div>
    </>
  );
};

export default SearchFilterCrearOrden;
