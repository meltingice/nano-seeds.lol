import React from "react";

export default class Account extends React.Component {
  state = { loading: true, balance: 0, blocks: 0 };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const resp = await fetch(
      `https://api.creeper.banano.cc/account/${this.props.address}`
    );

    const data = await resp.json();

    if (data.error) {
      this.setState(
        {
          loading: false,
          balance: 0,
          blocks: 0
        },
        this.updateParent.bind(this)
      );
    } else {
      this.setState(
        {
          loading: false,
          balance: data.account.balance + data.account.pending,
          blocks: parseInt(data.account.block_count)
        },
        this.updateParent.bind(this)
      );
    }
  }

  updateParent() {
    const { balance, blocks } = this.state;

    this.props.onLoaded();
    if (balance > 0) return this.props.onBalance();
    if (blocks > 0) return this.props.onBlocks();
  }

  render() {
    return (
      <div className="col-md-6">
        <p className="mb-0">
          <small>Address {this.props.index}</small>
        </p>
        <p className="text-monospace" style={{ wordWrap: "break-word" }}>
          <a
            href={`https://creeper.banano.cc/explorer/account/${
              this.props.address
            }/history`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.address}
          </a>
        </p>

        <p>
          {this.state.balance} BAN ({this.state.blocks} blocks)
        </p>
      </div>
    );
  }
}
