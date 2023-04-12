import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <h1 className="display-4">Every Banano seed is on this website.</h1>

          <p className="lead">
            Yes, your seed is on this website too, but don't worry, nobody will
            ever find it. If you want to try searching for your wallet, click
            the button below.
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <Link className="btn btn-lg btn-primary" to="/banano/1">
            Begin
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h2>How does Banano work?</h2>
          <p>
            A seed is 32 bytes of random data, usually displayed as a
            64-character hexidecimal string, that is used to deterministically
            generate private keys. Every seed can generate up to 2<sup>32</sup>{" "}
            - 1 private keys. A private key can be used to control a single
            account.
          </p>
          <p>
            Each private key can then be used to derive a public key. The public
            key is shareable and cannot be used in reverse to derive the private
            key. However, instead of sharing public keys, we typically share
            more human readable addresses.
          </p>
          <p>
            The Banano addresses that you are used to seeing are the public key,
            but encoded with a special base 32 encoding algorithm that excludes
            certain characters to help avoid ambiguity when reading or copying.
            These are the addresses that start with{" "}
            <span className="text-monospace">ban_</span> (in fact, the prefix is
            purely cosmetic). The final 8 characters of the address consist of a
            checksum so that wallets or other applications can validate the
            contents of the address before using.
          </p>

          <h2>Automatic balance checking</h2>
          <p>
            This website doesn't store a database of every seed, but instead
            generates them on the fly. The page number is used to calculate a
            range of seeds to display, from which it derives the Banano
            addresses. The account information is then checked from{" "}
            <a
              href="https://creeper.banano.cc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creeper
            </a>
            . Since every seed can generate 2<sup>32</sup> - 1 accounts, which
            would be impossible to check in a resonable amount of time, we only
            check the first two accounts for usage.
          </p>
          <p>
            Seeds with an account that has a balance are colored{" "}
            <span className="text-success">green</span>.<br />
            Seeds with no balance but with blocks, which means they've been
            used, are colored <span className="text-warning">yellow</span>.
            <br />
            Unused seeds are colored <span className="text-danger">red</span>.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
