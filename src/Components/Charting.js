import React, { useState } from "react";
import Nav from "./ Nav";

export default function Charting() {
  const [tickerSymbol, setTickerSymbol] = useState("");

  const handleInputChange = (e) => {
    setTickerSymbol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //do something with the submitted
  };

  return (
    <div>
      <Nav />
      <div class="form-group col-sm-8 container pt-5 mt-5">
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
          Go
        </button>
      </div>
    </div>
  );
}
