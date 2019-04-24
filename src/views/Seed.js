import React from "react";
import classNames from "classnames/bind";
import * as nano from "nanocurrency";

import Account from "./Account";
import styles from "./Seed.module.css";
const cx = classNames.bind(styles);

export default class Seed extends React.Component {
  state = {
    hasBalance: false,
    hasBlocks: false,
    loadCount: 0
  };

  address(index) {
    const secretKey = nano.deriveSecretKey(this.props.seed, index);
    const publicKey = nano.derivePublicKey(secretKey);
    return nano.deriveAddress(publicKey);
  }

  get classes() {
    let state;

    if (this.state.loadCount < 2) state = "light";
    else if (this.state.hasBalance) state = "success";
    else if (this.state.hasBlocks) state = "warning";
    else state = "danger";

    return cx("row", "mb-2", {
      SeedContainer: true,
      [`border-${state}`]: true
    });
  }

  get updateMethods() {
    return {
      onLoaded: () => this.setState({ loadCount: this.state.loadCount + 1 }),
      onBalance: () => this.setState({ hasBalance: true }),
      onBlocks: () => this.setState({ hasBlocks: true })
    };
  }

  render() {
    return (
      <div className={this.classes}>
        <div className="col">
          <div className="row">
            <div className="col">
              <p className="mb-0">
                <small>Seed</small>
              </p>
              <p className={cx("text-monospace", styles.Seed)}>
                {this.props.seed}
              </p>
            </div>
          </div>

          <div className="row">
            <Account
              address={this.address(0)}
              index={1}
              {...this.updateMethods}
            />
            <Account
              address={this.address(1)}
              index={2}
              {...this.updateMethods}
            />
          </div>
        </div>
      </div>
    );
  }
}
