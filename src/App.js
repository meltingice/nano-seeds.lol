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
            Nano-Seeds.lol
          </Link>
        </div>
      </nav>

      <div className="container my-5 pt-5">
        <Route path="/" exact component={Index} />
        <Route path="/nano/:page" component={NanoKeys} />
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
                href="https://nanocrawler.cc/explorer/account/xrb_3xemzomy4atzmq5u55mzzixqw9zxykyeyeiqia7rb1xy1saufpr8wzder1xh/history"
                target="_blank"
                rel="noopener noreferrer"
              >
                xrb_3xemzomy4atzmq5u55mzzixqw9zxykyeyeiqia7rb1xy1saufpr8wzder1xh
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
