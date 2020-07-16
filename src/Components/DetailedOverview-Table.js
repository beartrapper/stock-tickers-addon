import React, { useEffect, useState } from "react";
import Nav from "./ Nav";
import { useLocation, Redirect } from "react-router-dom";
import axios from "axios";

export default function DetailedOverviewTable() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [redirectSpecific, setRedirectSpecific] = useState(false);
  const [stocksData, setStocksData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(location.state.data);
    setData(location.state.data);
  }, []);

  const handleClick = (item) => {
    setLoading(true);

    axios
      .get(
        `https://api.marketstack.com/v1/tickers/${item.symbol}/eod/latest?access_key=6d427f17f573fda98386eecbff4d9ce6`
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
    <>
      {/* redirecting to the specific stock page */}
      {redirectSpecific ? (
        <Redirect
          to={{
            pathname: "/detailed-stockprice/specific",
            state: {
              data: stocksData,
            },
          }}
        />
      ) : (
        <></>
      )}
      <Nav />
      <div className="container pt-5 col-sm-8">
        {loading ? (
          <div className="col-sm-12 alert alert-info">Please wait</div>
        ) : (
          ""
        )}
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Name</th>
              <th scope="col">Exchange</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr onClick={() => handleClick(item)}>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
                  <td>{item.stock_exchange.acronym}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
