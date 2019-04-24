import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import Index from "./views/Index";
import NanoKeys from "./views/NanoKeys";

import classNames from "classnames/bind";
import styles from "./App.module.css";
const cx = classNames.bind(styles);

function App() {
  return (
    <Fragment>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Banano-Seeds.lol
          </Link>
        </div>
      </nav>

      <div className="container my-5 pt-5">
        <Route path="/" exact component={Index} />
        <Route path="/banano/:page" component={NanoKeys} />
      </div>

      <div className="container-fluid">
        <hr />

        <div className="row mb-3 align-items-center">
          <div className="col">
            <p className="mb-0">Created by Ryan LeFevre (@meltingice)</p>
            <p>
              Donations:{" "}
              <a
                className={cx("text-monospace", styles.wordBreak)}
                href="https://creeper.banano.cc/explorer/account/ban_1dpe11rjii8r4k448gbgfpbg18p8444edayaq4to3hsquha4qhy65cjbtk8b/history"
                target="_blank"
                rel="noopener noreferrer"
              >
                ban_1dpe11rjii8r4k448gbgfpbg18p8444edayaq4to3hsquha4qhy65cjbtk8b
              </a>
            </p>
          </div>
          <div className="col-auto">
            <a
              href="https://github.com/meltingice/nano-seeds.lol"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
