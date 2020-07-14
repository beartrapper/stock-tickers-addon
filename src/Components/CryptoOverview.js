import React, { useEffect, useState } from "react";
import Nav from "./ Nav";
import axios from "axios";
import { Redirect } from "react-router-dom";
var BarChart = require("barchart");

export default function CryptoOverview() {
  const [cryptoData, setCryptoData] = useState({
    btc: "loading..",
    eth: "loading..",
    usdt: "loading..",
    xrp: "loading..",
    bch: "loading..",
    ada: "loading..",
    bsv: "loading..",
    link: "loading..",
    ltc: "loading..",
    bnb: "loading..",
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => {
        console.log(res.data.data);
        setCryptoData(res.data.data.market_cap_percentage);
        //data for chart
        var bc = new BarChart({
          barColors: ["#34eb7a", "#34eb7a"],
          labelInsideColors: ["#FFF", "#FFF"],
          // autoScale: true,
          minimum: 0,
          maximum: 100,
          container: document.getElementById("chart-container"),
        });
        bc.data([
          [
            { name: "btc", value: res.data.data.market_cap_percentage.btc },
            { name: "eth", value: res.data.data.market_cap_percentage.eth },
            { name: "usdt", value: res.data.data.market_cap_percentage.usdt },
            { name: "xrp", value: res.data.data.market_cap_percentage.xrp },
            { name: "ada", value: res.data.data.market_cap_percentage.ada },
            { name: "ltc", value: res.data.data.market_cap_percentage.ltc },
          ],
        ]);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (currency) => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
      )
      .then((res) => {
        setCryptoData(res.data);
        setName(currency);
        setLoading(false);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Nav />
      {redirect ? (
        <Redirect
          to={{
            pathname: "/crypto-specific",
            state: {
              data: cryptoData,
              name,
            },
          }}
        />
      ) : (
        <></>
      )}
      <div className="container pt-4">
        {loading ? (
          <div className="col-sm-12 alert alert-info">Please wait</div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-sm-12 bg-light p-3 text-center">
            <h4>Crypto Overview</h4>
          </div>
          <div className="col-sm-4 pt-5 ">
            <div className="row pb-3 bg-light pr-3 pt-3 pl-5 mb-5">
              <b>Market Percentage</b>
              <small>Click on the currency to see details</small>
            </div>
            <div className="row" onClick={() => handleClick("bitcoin")}>
              <p className="text-center">
                <b>Bitcoin</b> - btc - {cryptoData.btc} %
                <hr />
              </p>
            </div>
            <div className="row" onClick={() => handleClick("ethereum")}>
              <p className="text-center">
                <b>Ethereum</b> - eth - {cryptoData.eth} %
                <hr />
              </p>
            </div>
            <div className="row" onClick={() => handleClick("tether")}>
              <p className="text-center">
                <b>Tether</b> - usdt - {cryptoData.usdt} %
                <hr />
              </p>
            </div>
            <div className="row" onClick={() => handleClick("ripple")}>
              <p className="text-center">
                <b>Ripple</b> - xrp - {cryptoData.xrp} %
                <hr />
              </p>
            </div>

            <div className="row" onClick={() => handleClick("cardano")}>
              <p className="text-center">
                <b>Cardano</b> - ada - {cryptoData.ada} %
                <hr />
              </p>
            </div>

            <div className="row" onClick={() => handleClick("litecoin")}>
              <p className="text-center">
                <b>Litecoin</b> - ltc - {cryptoData.ltc} %
                <hr />
              </p>
            </div>
          </div>
          <div className="col-sm-8" id="chart-container"></div>
        </div>
      </div>
    </div>
  );
}
