import React, { useState } from "react";
import Nav from "./ Nav";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function Charting() {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState(false);

  const handleInputChange = (e) => {
    setTickerSymbol(e.target.value);
    setError(false);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .get(
        `https://api.marketstack.com/v1/eod?access_key=6d427f17f573fda98386eecbff4d9ce6&symbols=${tickerSymbol}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setRedirect(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
    //do something with the submitted
  };

  return (
    <div>
      {/* redirecting to the specific stock page */}
      {redirect ? (
        <Redirect
          to={{
            pathname: "/stockmarket-charting/specific",
            state: {
              data,
            },
          }}
        />
      ) : (
        <></>
      )}
      <Nav />
      <div class="form-group col-sm-8 container pt-5 mt-5">
        {error ? (
          <div className="col-sm-12 alert alert-danger">
            Is the symbol or name typed correctly?
          </div>
        ) : (
          <></>
        )}
        <label for="exampleInputEmail1">
          <h4>Please enter a valid ticker symbol</h4>
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter one symbol"
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
