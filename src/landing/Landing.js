import Banner from "./Banner";
import Product from "../products/Product";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight, faTruck, faCreditCard, faMoneyCheckAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

function Landing() {
  const [viewType, setViewType] = useState({ grid: true });

 

  return (
    <>
      <ScrollToTopOnMount />
      <Banner />

      

      <div className="container pb-5 px-lg-5 mr-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5 mt-1">
       

        <div className="col-lg-4 d-none d-lg-block">
            <div className="input-group">
            <button className="btn btn-outline-dark">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              <input className="form-control" type="text" placeholder="Search products..." aria-label="search input" />
              <div className="input-group-append">
               
              </div>
            </div>
          </div>

          <div className="col-lg-3 d-none d-lg-block ">
          
            <select className="form-select " aria-label="Default select example" defaultValue="">
              <option value="">All</option>
              <option value="1">X</option>
              <option value="2">Y</option>
              <option value="3">X</option>
            </select>
            
          </div>
         
        
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5  mt-1">
         
           <div  className="col-lg-4">
              <Product />
            </div>
            <div  className="col-lg-4">
              <Product />
            </div>
            <div  className="col-lg-4">
              <Product />
            </div>
            
        </div>
      </div>

      <div className="d-flex flex-column bg-white py-4">
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
          LOAD MORE <FontAwesomeIcon icon={faSpinner} className="ms-2" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
