
import { Link } from "react-router-dom";

function Product() {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt=""
          src="not found"
        />
        <div className="card-body">
          <h5 className="card-title text-center">Croc Embossed Baguette Bag</h5>
          <p className="card-text text-center text-muted">1000 RM</p>
          <div className="d-grid gap-2">
            <Link to="/" className="btn btn-outline-dark" replace>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
