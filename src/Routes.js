import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductDetail from "./products/ProductDetail";

function Routes() {
  return (
    <Switch>
      <Route path="/product_details/:productId" exact>
        <ProductDetail />
      </Route>
      <Route path="/" exact>
        <Landing />
      </Route>
    </Switch>
  );
}

export default Routes;
