import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import BigNumber from "bignumber.js";
import Seed from "./Seed";
import config from "../config.json";

import classNames from "classnames/bind";
import styles from "./NanoKeys.module.css";
const cx = classNames.bind(styles);

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
      <div className="row mb-3">
        <div className="col">
          <p className={cx("text-center", styles.wordBreak)}>
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

      <p className="mb-5">
        Every Nano seed can generate 2<sup>32</sup> - 1 addresses. Obviously
        it's not feasible to check every one, so instead we only check the first
        two. Most of the time the first account is used since it's the default
        in all the wallets.
      </p>

      <JumpToSeed />

      <Navigation
        className="mb-3"
        currentPage={currentPage}
        nextRandom={nextRandom}
      />
      <Seeds startSeed={startSeed} />
      <Navigation
        className="my-3"
        currentPage={currentPage}
        nextRandom={nextRandom}
      />
    </Fragment>
  );
}

const JumpToSeed = withRouter(({ history }) => {
  const [value, setValue] = useState("");
  const onSubmit = e => {
    e.preventDefault();

    const page = BigNumber(`0x${value}`)
      .dividedToIntegerBy(config.seedsPerPage)
      .plus(1)
      .toFixed(0);

    history.push(`/nano/${page}`);
  };

  return (
    <div className="row justify-content-center mb-5">
      <div className="col-auto">
        <form className="form-inline" onSubmit={onSubmit}>
          <input
            type="text"
            className={cx(
              "form-control mr-1 mb-1 mb-md-0",
              styles.jumpToSeedInput
            )}
            placeholder="Jump to Seed"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="btn btn-primary">Go</button>
        </form>
        <small className="form-text text-muted">
          Your seed is used client-side only as this website has no server.
          <br />
          You can also{" "}
          <a
            href="https://github.com/meltingice/nano-seeds.lol"
            target="_blank"
            rel="noopener noreferrer"
          >
            inspect the code and run this project locally
          </a>
          .
        </small>
      </div>
    </div>
  );
});

const Navigation = ({ currentPage, nextRandom, className }) => (
  <div className={cx(className, "row justify-content-center")}>
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
