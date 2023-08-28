import "./bootstrap-custom.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { HashRouter as Router } from "react-router-dom";
import { CartProvider } from "./components/CartContext"; // Import the CartProvider

library.add(fas, far, fab);

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <Router>
    <CartProvider>
      <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
