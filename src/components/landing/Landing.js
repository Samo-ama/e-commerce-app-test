import Banner from "./Banner";
import ProductList from "../products/ProductList";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";

function Landing() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store selectedCategory
  const [categories, setCategories] = useState([]); // State to store categories
 
  // Fetch categories from the API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Handler for updating search query
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  //update the selected category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <ScrollToTopOnMount />
      <Banner />

      <div className="container pb-5 px-lg-5 mr-5 mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5 mt-1">
          <div className="col-lg-4 d-none d-lg-block">
            <div className="input-group">
              <button className="btn btn-outline-dark">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                className="form-control"
                type="text"
                placeholder="Search products..."
                aria-label="search input"
                value={searchQuery}
                onChange={handleSearch} // Call handleSearch on input change
              />
              <div className="input-group-append"></div>
            </div>
          </div>

          <div className="col-lg-3 d-none d-lg-block ">
            <select
              className="form-select "
              aria-label="Default select example"
              defaultValue=""
              onChange={handleCategoryChange}
            >
              <option value="">All category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ProductList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
}

export default Landing;
