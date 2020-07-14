import React, { useState } from "react";
import Nav from "./ Nav";
import axios from "axios";
import { get } from "jquery";
import { Redirect } from "react-router-dom";

export default function DetailedOverview() {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [redirectSpecific, setRedirectSpecific] = useState(false);
  const [redirectTable, setRedirectTable] = useState(false);
  const [tableElements, setTableElements] = useState([]);
  const [stocksData, setStocksData] = useState("");
  const [errFetching, setErrorFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setTickerSymbol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //for multiple symbols
    if (tickerSymbol.includes(",")) {
      console.log(tickerSymbol);

      let symbolsArray;
      symbolsArray = tickerSymbol.split(",");
      let counter = 0;

      //recursive looping
      const getInfoForAllSymbols = () => {
        setLoading(true);
        axios
          .get(
            `http://api.marketstack.com/v1/tickers/${symbolsArray[counter]}?access_key=3a18c181b4a13c580bd27040d54be74a`
          )
          .then((res) => {
            tableElements.push(res.data);
            counter++;
            if (counter < symbolsArray.length) getInfoForAllSymbols();
            else {
              setRedirectTable(true);
              setLoading(false);
            }
          })
          .catch((err) => {
            setErrorFetching(true);
          });
      };

      //calling the recusive function
      getInfoForAllSymbols();
    } else {
      //for single stock
      axios
        .get(
          `http://api.marketstack.com/v1/tickers/${tickerSymbol}/eod/latest?access_key=3a18c181b4a13c580bd27040d54be74a`
        )
        .then((res) => {
          setStocksData(res.data);
          setRedirectSpecific(true);
        })
        .catch((err) => {
          setErrorFetching(true);
        });
    }
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
      {/* redirecting to the tables stock page */}

      {redirectTable ? (
        <Redirect
          to={{
            pathname: "/detailed-quote/table",
            state: {
              data: tableElements,
            },
          }}
        />
      ) : (
        <></>
      )}
      <Nav />
      <div class="form-group col-sm-8 container pt-5 mt-5">
        <label for="exampleInputEmail1">
          <h4>Please enter a valid ticker symbol(s) or company name:</h4>
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter upto 10 symbols or companies(comma separated)"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          class="btn btn-primary col-sm-4 text-center mt-4"
          onClick={handleSubmit}
        >
          {loading ? "Please wait" : "Go"}
        </button>
      </div>
    </div>
  );
}
