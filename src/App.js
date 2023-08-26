import Template from "./template/Template";

import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";



function App() {
  return (
    <Template>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
