import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../CartContext";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const { cart } = useCart();
  const totalItemsInCart = cart.length;

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" onClick={toggleDrawer}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon icon={["fab", "erlang"]} className="ms-1" size="lg" />
            <span className="ms-2 h5">Commerce</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? "open" : "")}>
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link to="/" className="nav-link" replace onClick={changeNav}>
                  Products
                </Link>
              </li>

              {/* Conditional rendering for mobile view */}
              {openedDrawer && (
                <>
                  <li className="nav-item">
                    <Link to="/my-cart" className="nav-link" replace onClick={changeNav}>
                      <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                      <span className="ms-3 badge rounded-pill bg-dark">{totalItemsInCart}</span>
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      href="#!"
                      className="nav-link dropdown-toggle"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={["fas", "user-alt"]} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      <li>
                        <Link to="/" className="dropdown-item">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="dropdown-item">
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Render only for desktop view */}
          {!openedDrawer && (
            <>
              <Link to="/my-cart">
                <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                  <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                  <span className="ms-3 badge rounded-pill bg-dark">{totalItemsInCart}</span>
                </button>
              </Link>

              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    href="#!"
                    className="nav-link dropdown-toggle d-none d-lg-inline"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={["fas", "user-alt"]} />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link to="/" className="dropdown-item">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="dropdown-item">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
