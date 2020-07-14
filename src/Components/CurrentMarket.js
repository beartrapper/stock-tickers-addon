import React, { useEffect, useState } from "react";
import Nav from "./ Nav";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

export default function CurrentMarket() {
  const [NYSEstocks, setNYSEstocks] = useState([]);
  const [NASDAQstocks, setNASDAQstocks] = useState([]);
  const [done, setDone] = useState(false);
  const [stocksData, setStocksData] = useState("");
  const [redirectSpecific, setRedirectSpecific] = useState(false);
  const [loading, setLoading] = useState(false);
  const mappingVariable = [1, 2, 3, 5, 6];

  useEffect(() => {
    //getting NYSE stock data
    axios
      .get(
        `http://api.marketstack.com/v1/exchanges/XNYS/tickers?access_key=3a18c181b4a13c580bd27040d54be74a`
      )
      .then((res) => {
        setNYSEstocks(res.data);
        console.log(res.data);
        //getting NASDAQ stock data
        axios
          .get(
            `http://api.marketstack.com/v1/exchanges/XNYS/tickers?access_key=3a18c181b4a13c580bd27040d54be74a`
          )
          .then((res) => {
            setNASDAQstocks(res.data);
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
        `http://api.marketstack.com/v1/tickers/${symbol}/eod/latest?access_key=3a18c181b4a13c580bd27040d54be74a`
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
            <div className="row p-5">
              <p>Chart goes here</p>
            </div>
          </div>
          <div className="col-sm-6">
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
              <div className="col-sm-12 ">
                <h6>NYSE</h6>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-6"></div>
                </div>
                {done ? (
                  <>
                    {mappingVariable.map((item, key) => {
                      const genIndex = Math.floor(Math.random() * 99);
                      return (
                        <>
                          <p
                            onClick={() =>
                              handleClick(
                                NYSEstocks.data.tickers[genIndex].symbol
                              )
                            }
                          >
                            <b>{NYSEstocks.data.tickers[genIndex].name}</b> -{" "}
                            {NYSEstocks.data.tickers[genIndex].symbol}
                          </p>
                          <hr />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>Loading..</>
                )}

                <p></p>
              </div>
            </div>

            {/* NASDAQ stocks */}
            <div className="row pl-4 pt-4">
              <div className="col-sm-12 ">
                <h6>NASDAQ</h6>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-6"></div>
                </div>
                {done ? (
                  <>
                    {mappingVariable.map((item, key) => {
                      const genIndex = Math.floor(Math.random() * 99);
                      return (
                        <>
                          <p
                            onClick={() =>
                              handleClick(
                                NASDAQstocks.data.tickers[genIndex].symbol
                              )
                            }
                          >
                            <b>{NASDAQstocks.data.tickers[genIndex].name}</b> -{" "}
                            {NASDAQstocks.data.tickers[genIndex].symbol}
                          </p>
                          <hr />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>Loading..</>
                )}

                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
