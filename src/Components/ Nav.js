import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="text-center" className="navbar-header">
              <button className="navbar-toggler" data-toggle="open-navbar1">
                <span></span>
                <span></span>
                <span></span>
              </button>

              <h4 className="text-center p-4">
                This Live Market Stock Feed is proudly brought to you by
                renowned Boracchia Wiviott Wealth Partners
                <br />
                <span className="mt-5 text-primary">
                  <a href="https://www.investingprofits.pro/home">
                    InvestingProfits.Pro
                  </a>
                  {"  &  "}
                  <a href="https://www.financialplans.info">
                    FinancialPlans.Info
                  </a>
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div
            className="navbar-menu text-center custom-padding-nav"
            id="open-navbar1"
          >
            <ul className="navbar-nav text-center ">
              <li
                className={
                  window.location.href.includes(
                    "stockmarket-livemarket-overview"
                  )
                    ? "active"
                    : "remove-link-issue"
                }
              >
                <Link
                  className="remove-link-issue"
                  to="/stockmarket-livemarket-overview"
                >
                  <a className="remove-link-issue" href="#">
                    Market Overview
                  </a>
                </Link>
              </li>

              <li
                className={
                  window.location.href.includes("cryptocurrency-overview")
                    ? "active"
                    : "remove-link-issue"
                }
              >
                <Link
                  className="remove-link-issue"
                  to="/cryptocurrency-overview"
                >
                  <a className="remove-link-issue" href="#">
                    Crypto Overview
                  </a>
                </Link>
              </li>
              <li
                className={
                  window.location.href.includes("detailed-stockprice")
                    ? "active"
                    : ""
                }
              >
                <Link to="/detailed-stockprice">
                  <a className="remove-link-issue" href="#">
                    Detailed Quote
                  </a>
                </Link>
              </li>
              <li
                className={
                  window.location.href.includes("stockmarket-charting")
                    ? "active"
                    : ""
                }
              >
                <Link to="/stockmarket-charting">
                  <a className="remove-link-issue" href="#">
                    Charting
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
