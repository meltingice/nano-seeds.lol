import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import Index from "./views/Index";
import NanoKeys from "./views/NanoKeys";

function App() {
  return (
    <Fragment>
      <nav className="navbar fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Nano-Seeds.lol
        </Link>
      </nav>

      <div className="container mt-5 pt-5">
        <Route path="/" exact component={Index} />
        <Route path="/nano/:page" component={NanoKeys} />
      </div>
    </Fragment>
  );
}

export default App;
