import React, { useState, useEffect } from "react";
import Product from "./Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "../../index.css";


function ProductList({ searchQuery, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(9);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // Data is loaded, set loading to false
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching products:", error);
        setLoading(false); // Error occurred, set loading to false
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5 mt-5">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }
  // Display error message
  if (error) {
    return (
      <div className="bg-light text-black text-center py-2 mt-5">
        <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
        <p className="mt-2">
          <strong>Error:</strong> Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  const loadMore = () => {
    const remainingProducts = filteredProducts.slice(visibleProducts);
    setVisibleProducts(visibleProducts + Math.min(9, remainingProducts.length));
  };

  // Filter products based on search query
  const filteredProducts = products
    ? products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedCategory === "" || product.category === selectedCategory)
        );
      })
    : [];

  return (
    <spam>
      <div className="product-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5 mt-1">
        {!loading &&
          !error &&
          filteredProducts.slice(0, visibleProducts).map((product) => (
            <div key={product.id} className="col product-col">
              <Product product={product} />
            </div>
          ))}
      </div>
      <br />

      {!loading && visibleProducts < filteredProducts.length && (
        <div className="d-flex flex-column bg-white py-4">
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={loadMore} replace>
              LOAD MORE <FontAwesomeIcon icon={faSpinner} className="ms-2" />
            </button>
          </div>
        </div>
      )}
    </spam>
  );
}

export default ProductList;
