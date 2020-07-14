import React, { useState, useEffect } from "react";
import Nav from "./ Nav";
import { useLocation } from "react-router-dom";
import LineGraph from "react-line-graph";
import axios from "axios";

export default function CryptoSpecific() {
  const location = useLocation();
  const [data, setData] = useState(0);
  const [name, setName] = useState("");
  const [dataLayer, setDataLayer] = useState([]);
  const properties = {
    smoothing: 0.3,
    accent: "palevioletred",
    fillBelow: "rgba(200,67,23,0.1)",
    hover: true,
    gridX: true,
    gridY: true,
  };

  useEffect(() => {
    setData(location.state.data);
    setName(location.state.name);
    console.log(location.state);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${location.state.name}/market_chart?vs_currency=usd&days=1`
      )
      .then((res) => {
        console.log(res.data);
        setDataLayer(res.data.prices);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-5">
            <div className="row pt-3 pb-3">
              <h4>
                <b>{name} Overview</b>
              </h4>
            </div>

            {name == "bitcoin" ? (
              <div>
                <div className="row pt-3">
                  <b>price -</b> - {data.bitcoin.usd}$
                </div>
                <div className="row pt-3">
                  <b>market cap -</b> - {data.bitcoin.usd_market_cap}$
                </div>
                <div className="row pt-3">
                  <b>24hr Change -</b> - {data.bitcoin.usd_24h_change}%
                </div>
                <div className="row pt-3">
                  <b>24 hr volume -</b> - {data.bitcoin.usd_24h_vol}
                </div>
              </div>
            ) : (
              <></>
            )}

            {name == "ethereum" ? (
              <div>
                <div className="row pt-3">
                  <b>price -</b> - {data.ethereum.usd}$
                </div>
                <div className="row pt-3">
                  <b>market cap -</b> - {data.ethereum.usd_market_cap}$
                </div>
                <div className="row pt-3">
                  <b>24hr Change -</b> - {data.ethereum.usd_24h_change}%
                </div>
                <div className="row pt-3">
                  <b>24 hr volume -</b> - {data.ethereum.usd_24h_vol}
                </div>
              </div>
            ) : (
              <></>
            )}

            {name == "tether" ? (
              <div>
                <div className="row pt-3">
                  <b>price -</b> - {data.tether.usd}$
                </div>
                <div className="row pt-3">
                  <b>market cap -</b> - {data.tether.usd_market_cap}$
                </div>
                <div className="row pt-3">
                  <b>24hr Change -</b> - {data.tether.usd_24h_change}%
                </div>
                <div className="row pt-3">
                  <b>24 hr volume -</b> - {data.tether.usd_24h_vol}
                </div>
              </div>
            ) : (
              <></>
            )}

            {name == "ripple" ? (
              <div>
                <div className="row pt-3">
                  <b>price -</b> - {data.ripple.usd}$
                </div>
                <div className="row pt-3">
                  <b>market cap -</b> - {data.ripple.usd_market_cap}$
                </div>
                <div className="row pt-3">
                  <b>24hr Change -</b> - {data.ripple.usd_24h_change}%
                </div>
                <div className="row pt-3">
                  <b>24 hr volume -</b> - {data.ripple.usd_24h_vol}
                </div>
              </div>
            ) : (
              <></>
            )}

            {name == "cardano" ? (
              <div>
                <div className="row pt-3">
                  <b>price -</b> - {data.cardano.usd}$
                </div>
                <div className="row pt-3">
                  <b>market cap -</b> - {data.cardano.usd_market_cap}$
                </div>
                <div className="row pt-3">
                  <b>24hr Change -</b> - {data.cardano.usd_24h_change}%
                </div>
                <div className="row pt-3">
                  <b>24 hr volume -</b> - {data.cardano.usd_24h_vol}
                </div>
              </div>
            ) : (
              <></>
            )}

            {name == "litecoin" ? (
              <div>
                <div className="row pt-3">
                  <b>price -</b> - {data.litecoin.usd}$
                </div>
                <div className="row pt-3">
                  <b>market cap -</b> - {data.litecoin.usd_market_cap}$
                </div>
                <div className="row pt-3">
                  <b>24hr Change -</b> - {data.litecoin.usd_24h_change}%
                </div>
                <div className="row pt-3">
                  <b>24 hr volume -</b> - {data.litecoin.usd_24h_vol}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-sm-6">
            <h4>
              <b>24hr Graph</b>
            </h4>
            <LineGraph data={dataLayer} {...properties} />
          </div>
        </div>
      </div>
    </div>
  );
}
