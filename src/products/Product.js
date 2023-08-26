import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div className="card shadow-sm">
      <img
        className="card-img-top bg-dark cover"
        height="240"
        alt=""
        src={product.image}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{product.title}</h5>
        <p className="card-text text-center text-muted">{product.price} RM</p>
        <p className="card-text text-center text-muted">Rate: {product.rating.rate} </p>
        <div className="d-grid gap-2">
          <Link to="/" className="btn btn-outline-dark" replace>
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
