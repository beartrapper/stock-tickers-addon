import React, { useEffect, useState } from "react";
import Nav from "./ Nav";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LineGraph from "react-line-graph";

export default function DetailedOverviewSpecific() {
  const location = useLocation();
  const [dataLayer, setDataLayer] = useState([]);
  const properties = {
    smoothing: 0.3,
    accent: "palevioletred",
    fillBelow: "rgba(200,67,23,0.1)",
    hover: true,
    gridX: true,
    gridY: true,
  };

  const [data, setData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [companyName, setCompanyName] = useState("fetching name...");

  useEffect(() => {
    setData(location.state.data);
    axios
      .get(
        `https://api.marketstack.com/v1/tickers/${location.state.data.symbol}?access_key=6d427f17f573fda98386eecbff4d9ce6`
      )
      .then((res) => {
        setCompanyName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `https://api.marketstack.com/v1/intraday?access_key=6d427f17f573fda98386eecbff4d9ce6&symbols=${location.state.data.symbol}`
      )
      .then((res) => {
        console.log("console", res.data);
        let chartValues = [];
        for (let count = 0; count < res.data.data.length; count++) {
          chartValues.push(res.data.data[count].close);
        }
        setDataLayer(chartValues);
        console.log("chart values", chartValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRefresh = () => {
    setRefresh(true);
    axios
      .get(
        `https://api.marketstack.com/v1/intraday/latest?access_key=6d427f17f573fda98386eecbff4d9ce6&symbols=${location.state.data.symbol}&interval=1min`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data[0]);
        setRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Nav />

      <div className="container pt-3">
        <button onClick={handleRefresh} className="btn btn-sm btn-primary">
          {refresh ? "Refreshing" : "Refresh"}
        </button>
        <div className="row">
          <div className="col-sm-4 pt-4">
            <div className="row pb-3 ">
              <div className="col-sm-6">
                <h6>{companyName}: </h6>
              </div>
              <div className="col-sm-1 mr-auto">{data.close}</div>
            </div>
            <p>
              <b>Open: </b> {data.open}
            </p>
            <hr />
            <p>
              <b>High: </b> {data.high}
            </p>
            <hr />
            <p>
              <b>Low: </b> {data.low}
            </p>
            <hr />
            {data.last ? (
              <>
                <p>
                  <b>Last: </b> {data.last}
                </p>
                <hr />
              </>
            ) : (
              <></>
            )}

            <p>
              <b>Close: </b> {data.close}
            </p>
            <hr />
            <p>
              <b>Symbol: </b> {data.symbol}
            </p>
            <hr />
            <p>
              <b>Exchange: </b> {data.exchange}
            </p>
            <hr />
          </div>
          <div className="col-sm-8">
            <div className="row">
              <h4>
                <b>24hr Graph</b>
              </h4>
            </div>
            <LineGraph data={dataLayer} {...properties} />
          </div>
        </div>
      </div>
    </div>
  );
}
