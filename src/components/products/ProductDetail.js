import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../CartContext";

function ProductDetail() {
  const iconPath =
    "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useCart(); // Get the dispatch function from the cart context
  const [isButtondisabled, setIsButtondisabled] = useState(true);

  useEffect(() => {
    // Fetch product from the API
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false); // Data is loaded, set loading to false
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching products:", error);
        setLoading(false); // Error occurred, set loading to false
      });
  }, [productId]);

  // Display loading state
  if (loading) {
    return (
      <div className="text-center py-5 mt-5">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light text-black d-flex flex-column align-items-center justify-content-center py-5 mt-5">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          size="2x"
          className="mt-4"
        />
        <p className="mt-4">
          <strong>Error:</strong> Something went wrong. Please try again later.
        </p>
      </div>
    );
  }
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity:1,
      },
    });
    setIsButtondisabled(false);
  };

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/">
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              {product.category}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={product.image}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{product.title}</h2>
            <h4 className="text-muted mb-4">{product.price} RM</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button
                  className="btn btn-outline-dark py-2 w-100"
                  disabled={!isButtondisabled}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100">Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">{product.category}</dd>

              <dt className="col-sm-4">Sold</dt>
              <dd className="col-sm-8 mb-3">{product.rating.count}</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <span>{product.rating.rate} </span>
                <div className="d-flex  mb-3 ">
                  <Ratings
                    rating={product.rating.rate}
                    widgetRatedColors="rgb(253, 204, 13)"
                    widgetSpacings="4px"
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      return (
                        <Ratings.Widget
                          key={i}
                          widgetDimension="20px"
                          svgIconViewBox="0 0 19 20"
                          svgIconPath={iconPath}
                          widgetHoverColor="rgb(253, 204, 13)"
                        />
                      );
                    })}
                  </Ratings>
                </div>
              </dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>{product.description}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
