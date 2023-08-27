import React from "react";
import { Link } from "react-router-dom";
import Ratings from "react-ratings-declarative";

function Product({ product }) {
  const iconPath =
    "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

  return (
    <div className="card shadow-sm  h-100">
      <img
        className="card-img-top bg-dark cover"
        height="240"
        alt=""
        src={product.image}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center">{product.title}</h5>

        <div className="mt-auto">
          <p className="card-text text-center text-muted">{product.price} RM</p>

          <p className="card-text text-center text-muted mr-3 ">
            <div className="d-flex justify-content-center mb-3 ">
              <Ratings
                rating={product.rating.rate}
                widgetRatedColors="rgb(253, 204, 13)"
                widgetSpacings="1px"
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
          </p>

          <div className="d-grid ">
            <Link
              to={`/product_details/${product.id}`}
              className="btn btn-outline-dark"
              replace
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
