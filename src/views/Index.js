import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <h1>Nano-Seeds.lol</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Link className="btn btn-lg btn-primary" to="/nano/1">
            Begin
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
