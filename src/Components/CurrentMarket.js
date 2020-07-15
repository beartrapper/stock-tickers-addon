import React, { useEffect, useState } from "react";
import Nav from "./ Nav";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
const BarChart = require("barchart");

export default function CurrentMarket() {
  const [NYSEstocks, setNYSEstocks] = useState([]);
  const [NASDAQstocks, setNASDAQstocks] = useState([]);
  const [done, setDone] = useState(false);
  const [stocksData, setStocksData] = useState("");
  const [redirectSpecific, setRedirectSpecific] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stockPricesNYSE, setStockPricesNYSE] = useState([]);
  const [stockPricesNASDAQ, setStockPricesNASDAQ] = useState([]);

  useEffect(() => {
    //getting NYSE stock data
    axios
      .get(
        `https://api.marketstack.com/v1/exchanges/XNYS/tickers?access_key=6d427f17f573fda98386eecbff4d9ce6`
      )
      .then((res) => {
        console.log(res.data);

        let NYSEarray = [];
        let symbolsArrayNYSE = [];

        for (let count = 0; count < 5; count++) {
          let genIndex = Math.floor(Math.random() * 99);
          NYSEarray.push(res.data.data.tickers[genIndex]);
          symbolsArrayNYSE.push(res.data.data.tickers[genIndex].symbol);
        }
        console.log("symbols array NYSE", symbolsArrayNYSE);

        let convertedStringNYSE = symbolsArrayNYSE.join();
        console.log("converted NYSE", convertedStringNYSE);

        // getting values for chosen values
        axios
          .get(
            `https://api.marketstack.com/v1/eod/latest?access_key=6d427f17f573fda98386eecbff4d9ce6&symbols=${convertedStringNYSE}`
          )
          .then((res) => {
            console.log("NYSE", res.data);
            setStockPricesNYSE(res.data.data);
            //filtering out the prices for chart
            let pricesNYSE = [];

            for (let counter = 0; counter < res.data.data.length; counter++) {
              pricesNYSE.push(res.data.data[counter].close);
            }

            const bc = new BarChart({
              barColors: ["#34eb7a", "#34eb7a"],
              labelInsideColors: ["#FFF", "#FFF"],
              // autoScale: true,
              minimum: 0,
              maximum: 500,
              container: document.getElementById("NYSE-chart-container"),
              width: 450,
              // barSpacing: "15px",
            });
            bc.data([
              [
                { name: symbolsArrayNYSE[0], value: pricesNYSE[0] },
                { name: symbolsArrayNYSE[1], value: pricesNYSE[1] },
                { name: symbolsArrayNYSE[2], value: pricesNYSE[2] },
                { name: symbolsArrayNYSE[3], value: pricesNYSE[3] },
                { name: symbolsArrayNYSE[4], value: pricesNYSE[4] },
              ],
            ]);
          })
          .catch((err) => {
            console.log(err);
          });

        setNYSEstocks(NYSEarray);
        console.log("NYSe", NYSEarray);
        //getting NASDAQ stock data
        axios
          .get(
            `https://api.marketstack.com/v1/exchanges/XNAS/tickers?access_key=6d427f17f573fda98386eecbff4d9ce6`
          )
          .then((res) => {
            let NASDAQarray = [];
            let symbolsArrayNASDAQ = [];
            let chartValuesNASDAQ = [];
            for (let count = 0; count < 5; count++) {
              let genIndex = Math.floor(Math.random() * 99);
              NASDAQarray.push(res.data.data.tickers[genIndex]);
              symbolsArrayNASDAQ.push(res.data.data.tickers[genIndex].symbol);
            }
            console.log("symbols array", symbolsArrayNASDAQ);
            let convertedStringNASDAQ = symbolsArrayNASDAQ.join();
            console.log(convertedStringNASDAQ);
            axios
              .get(
                `https://api.marketstack.com/v1/eod/latest?access_key=6d427f17f573fda98386eecbff4d9ce6&symbols=${convertedStringNASDAQ}`
              )
              .then((res) => {
                console.log("NASDAQ", res.data);
                setStockPricesNASDAQ(res.data.data);
                let pricesNASDAQ = [];

                //filtering out the prices for chart
                for (
                  let counter = 0;
                  counter < res.data.data.length;
                  counter++
                ) {
                  pricesNASDAQ.push(res.data.data[counter].close);
                }

                //making a new bar chart
                //data for chart
                const bc = new BarChart({
                  barColors: ["#34eb7a", "#34eb7a"],
                  labelInsideColors: ["#FFF", "#FFF"],
                  // autoScale: true,
                  minimum: 0,
                  maximum: 500,
                  container: document.getElementById("NASDAQ-chart-container"),
                  width: 450,
                });
                bc.data([
                  [
                    { name: symbolsArrayNASDAQ[0], value: pricesNASDAQ[0] },
                    { name: symbolsArrayNASDAQ[1], value: pricesNASDAQ[1] },
                    { name: symbolsArrayNASDAQ[2], value: pricesNASDAQ[2] },
                    { name: symbolsArrayNASDAQ[3], value: pricesNASDAQ[3] },
                    { name: symbolsArrayNASDAQ[4], value: pricesNASDAQ[4] },
                  ],
                ]);
              })
              .catch((err) => {
                console.log(err);
              });
            setNASDAQstocks(NASDAQarray);
            setDone(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //handle the specific symbol being clicked
  const handleClick = (symbol) => {
    setLoading(true);

    axios
      .get(
        `https://api.marketstack.com/v1/tickers/${symbol}/eod/latest?access_key=6d427f17f573fda98386eecbff4d9ce6`
      )
      .then((res) => {
        setStocksData(res.data);
        setRedirectSpecific(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* redirecting to the specific stock page */}
      {redirectSpecific ? (
        <Redirect
          to={{
            pathname: "/detailed-quote/specific",
            state: {
              data: stocksData,
            },
          }}
        />
      ) : (
        <></>
      )}
      <Nav />
      <div className="container pt-5 mt-5">
        {loading ? (
          <div className="col-sm-12 alert alert-info">Please wait</div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-sm-6 ">
            <div className="row bg-light p-2">
              <h5>Market Snapshot</h5>
            </div>
            <div
              className="row pt-5 col-sm-4 pb-5 mb-5"
              id="NYSE-chart-container"
            ></div>
            <div className="row pt-5 mt-5" id="NASDAQ-chart-container"></div>
          </div>
          <div className="col-sm-6 col-sm-4 ">
            <div className="row bg-light p-2 ml-2">
              <div className="col-sm-8">
                <h5>Market Movers</h5>
                <small>
                  Click on the stock that you need to see the details of
                </small>
              </div>
            </div>

            {/* NYSE Stocks */}
            <div className="row pl-4 pt-4">
              <div className="col-sm-12 pb-3">
                <h4>NYSE</h4>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-6">
                    {done ? (
                      <>
                        {NYSEstocks.map((item, key) => {
                          return (
                            <>
                              <p onClick={() => handleClick(item.symbol)}>
                                <b>{item.name}</b> - {item.symbol}
                              </p>
                              <hr />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>Loading..</>
                    )}
                  </div>
                  {done ? (
                    <>
                      <div className="col-sm-6">
                        {stockPricesNYSE.map((item) => {
                          return (
                            <>
                              <p className="text-right">{item.close}</p>
                              <hr />
                            </>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <p></p>
              </div>
            </div>

            {/* NASDAQ stocks */}
            <div className="row pl-4 pt-4">
              <div className="col-sm-12 pb-3 pt-3">
                <h4>NASDAQ</h4>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-6">
                    {done ? (
                      <>
                        {NASDAQstocks.map((item, key) => {
                          return (
                            <>
                              <p onClick={() => handleClick(item.symbol)}>
                                <b>{item.name}</b> - {item.symbol}
                              </p>
                              <hr />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>Loading..</>
                    )}
                  </div>
                  {done ? (
                    <>
                      <div className="col-sm-6">
                        {stockPricesNYSE.map((item) => {
                          return (
                            <>
                              <p className="text-right">{item.close}</p>
                              <hr />
                            </>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
