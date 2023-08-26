import React, { useState, useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


function ProductList({ searchQuery  , selectedCategory}) {
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
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    
    
    return <div>
      
      
     <h5>Error</h5> 
    <h6>Something went wrong. Please try again later.</h6>
  </div>; // Display error message
   
  }
  
  const loadMore = () => {
    const remainingProducts = filteredProducts.slice(visibleProducts);
    setVisibleProducts(
      visibleProducts + Math.min(9, remainingProducts.length)
    );
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())&&
    (selectedCategory === "" || product.category === selectedCategory)
  );

  return (
    <spam>

    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5 mt-1">
      {!loading &&
        !error && filteredProducts.slice(0, visibleProducts).map(product => (
              <div key={product.id} className="col-lg-4">
                <Product product={product} />
        </div>
      ))}
    </div>
    <br/>

    {!loading && visibleProducts < filteredProducts.length && (
<div className="d-flex flex-column bg-white py-4">
<div className="d-flex justify-content-center">
  <button  className="btn btn-primary"  onClick={loadMore} replace>
  LOAD MORE <FontAwesomeIcon icon={faSpinner} className="ms-2" />
  </button>
</div>
</div>
 )}

</spam>
  );
}

export default ProductList;
