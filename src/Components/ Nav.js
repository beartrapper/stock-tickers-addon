import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-header">
          <button className="navbar-toggler" data-toggle="open-navbar1">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a href="https://www.investingprofits.pro/home">
            <h4>
              Investing <span>Profits</span>
            </h4>
          </a>
        </div>

        <div className="navbar-menu" id="open-navbar1">
          <ul className="navbar-nav">
            <li
              className={
                window.location.href.includes("market-overview")
                  ? "active"
                  : "remove-link-issue"
              }
            >
              <Link className="remove-link-issue" to="/market-overview">
                <a className="remove-link-issue" href="#">
                  Market Overview
                </a>
              </Link>
            </li>
            <li
              className={
                window.location.href.includes("detailed-quote") ? "active" : ""
              }
            >
              <Link to="/detailed-quote">
                <a className="remove-link-issue" href="#">
                  Detialed Quote
                </a>
              </Link>
            </li>
            <li
              className={
                window.location.href.includes("charting") ? "active" : ""
              }
            >
              <Link to="/charting">
                <a className="remove-link-issue" href="#">
                  Charting
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
