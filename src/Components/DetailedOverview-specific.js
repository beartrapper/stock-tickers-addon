import React, { useEffect, useState } from "react";
import Nav from "./ Nav";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function DetailedOverviewSpecific() {
  const location = useLocation();

  const [data, setData] = useState("");
  const [companyName, setCompanyName] = useState("fetching name...");

  useEffect(() => {
    setData(location.state.data);
    axios
      .get(
        `http://api.marketstack.com/v1/tickers/${location.state.data.symbol}?access_key=3a18c181b4a13c580bd27040d54be74a`
      )
      .then((res) => {
        setCompanyName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Nav />
      {console.log(data)}
      <div className="container pt-5">
        <div className="col-sm-7 pt-4">
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
          <p>
            <b>Last: </b> {data.close}
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
      </div>
    </div>
  );
}
