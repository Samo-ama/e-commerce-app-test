import React, { useState, useEffect } from "react";
import Product from "./Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { products_API } from "../../fakestoreAPI";
import "../../index.css";

// Component to List Products
function ProductList({ searchQuery, selectedCategory }) {
  // State variables
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(9);

  // Asynchronous function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(products_API);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  // Fetch products when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Display loading spinner
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

  // Load more products when 'Load More' button is clicked
  const loadMore = () => {
    const nextVisible = visibleProducts + 9;
    setVisibleProducts(nextVisible);
  };

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
    );
  });

  return (
    <span>
      {/* Display filtered products */}
      <div className="product-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5 mt-1">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <div key={product.id} className="col product-col">
            <Product product={product} />
          </div>
        ))}
      </div>

      {/* Display 'Load More' button */}
      {visibleProducts < filteredProducts.length && (
        <div className="d-flex flex-column bg-white py-4">
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={loadMore}>
              LOAD MORE <FontAwesomeIcon icon={faSpinner} className="ms-2" />
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

export default ProductList;
