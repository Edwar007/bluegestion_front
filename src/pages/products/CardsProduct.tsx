import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import ProducSelec from "./ProducSelec";
import SearchFilterCrearOrden from "./SearchFilterSelecProduct";
import "./CardsProduct.css";

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

const CardsProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categoría");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/product/products`);
        const json = await response.json();

        if (json.success && Array.isArray(json.data)) {
          const mappedProducts: Product[] = json.data.map((item: any) => ({
            id: item.id,
            nameProduct: item.nameProduct,
            referenceProduct: item.referenceProduct,
            amountProduct: 1,
            description: item.description,
            stock: item.stock,
            categoryId: item.category?.id || 0,
            price: item.amountProduct,
            imagen: item.image,
            categoryName: item.category?.category || "Sin categoría",
          }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Generar categorías únicas usando categoryName
  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.categoryName))
  )
    .filter((name) => name !== "Sin categoría") // Excluir "Sin categoría"
    .sort(); // Ordenar alfabéticamente
    console.log(uniqueCategories);

  // Filtrar productos según búsqueda y categoría seleccionada
  const filteredProducts = products.filter((product) => {
    const matchesName = product.nameProduct
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Categoría" ||
      product.categoryName === selectedCategory;

    return matchesName && matchesCategory;
  });

  const handleAddProduct = (product: Product) => {
    const existing = selected.find((p) => p.id === product.id);
    if (existing) {
      if (existing.amountProduct < existing.stock) {
        setSelected((prev) =>
          prev.map((p) =>
            p.id === product.id
              ? { ...p, amountProduct: p.amountProduct + 1 }
              : p
          )
        );
      } else {
        console.log("No se puede agregar más, alcanzado el stock");
      }
    } else {
      if (product.stock > 0) {
        setSelected((prev) => [...prev, { ...product, amountProduct: 1 }]);
      } else {
        console.log("No se puede agregar, producto agotado");
      }
    }
  };

  return (
    <div className="card-section">
      <div className="card-left">
        <SearchFilterCrearOrden
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={uniqueCategories}
        />

        <div className="card-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card-wrapper">
              <Card
                nameProduct={product.nameProduct}
                price={product.price}
                imagen={product.imagen}
                onAdd={() => handleAddProduct(product)}
              />
              {product.stock === 0 && (
                <div className="out-of-stock-warning">Agotado</div>
              )}
            </div>
          ))}

          {Array.from({ length: (4 - (filteredProducts.length % 4)) % 4 }).map(
            (_, index) => (
              <div key={`shadow-${index}`} className="card shadow-card"></div>
            )
          )}
        </div>
      </div>
      <div className="card-right">
        <ProducSelec selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
};

export default CardsProduct;
