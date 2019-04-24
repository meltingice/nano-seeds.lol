import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import BigNumber from "bignumber.js";
import Seed from "./Seed";

import config from "../config.json";

const MAX_ADDRESSES = BigNumber(
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
);
const MAX_PAGES = MAX_ADDRESSES.dividedToIntegerBy(config.seedsPerPage).plus(1);

export default function NanoKeys({ match }) {
  const currentPage = BigNumber(match.params.page);
  const startSeed = BigNumber(config.seedsPerPage).multipliedBy(
    currentPage.minus(1)
  );

  const nextRandom = BigNumber.minimum(
    BigNumber.random(MAX_PAGES.toString(10).length).multipliedBy(MAX_PAGES),
    MAX_PAGES
  );

  return (
    <Fragment>
      <div className="row mb-5">
        <div className="col">
          <p className="text-center">
            Page
            <br />
            <b>{match.params.page}</b>
            <br />
            of
            <br />
            <b>{MAX_PAGES.toString(10)}</b>
            <br />
          </p>
        </div>
      </div>

      <Navigation currentPage={currentPage} nextRandom={nextRandom} />
      <Seeds startSeed={startSeed} />
      <Navigation currentPage={currentPage} nextRandom={nextRandom} />
    </Fragment>
  );
}

const Navigation = ({ currentPage, nextRandom }) => (
  <div className="row justify-content-center my-5">
    <div className="col-auto">
      <div className="btn-group">
        <Link className="btn btn-primary" to="/nano/1">
          First
        </Link>
        {currentPage.gt(1) && (
          <Link
            className="btn btn-primary"
            to={`/nano/${currentPage.minus(1).toFixed(0)}`}
          >
            Previous
          </Link>
        )}
        <Link className="btn btn-primary" to={`/nano/${nextRandom.toFixed(0)}`}>
          Random
        </Link>
        {!currentPage.eq(MAX_PAGES) && (
          <Link
            className="btn btn-primary"
            to={`/nano/${currentPage.plus(1).toFixed(0)}`}
          >
            Next
          </Link>
        )}
        <Link
          className="btn btn-primary"
          to={`/nano/${MAX_PAGES.toString(10)}`}
        >
          Last
        </Link>
      </div>
    </div>
  </div>
);

const Seeds = ({ startSeed }) => {
  const endSeed = startSeed.plus(config.seedsPerPage);
  let components = [];
  for (let i = 0; i < config.seedsPerPage; i++) {
    const seed = startSeed
      .plus(i)
      .toString(16)
      .padStart(64, "0");

    components.push(<Seed seed={seed} key={seed} />);
  }

  return <Fragment>{components}</Fragment>;
};
