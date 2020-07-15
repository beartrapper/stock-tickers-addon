import React, { useEffect, useState } from "react";
import Nav from "./ Nav";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LineGraph from "react-line-graph";
import moment from "moment";

export default function ChartingSpecific() {
  const location = useLocation();
  const [companyDetail, setCompanyDetail] = useState(0);
  const [chartType, setChartType] = useState("24hr");
  const [companyName, setCompanyName] = useState("Fetching name..");
  const [assigned, setAssigned] = useState(false);
  const [highValues, setHighValues] = useState([]);
  const [lowValues, setLowValues] = useState([]);
  const [closeValues, setCloseValues] = useState([]);
  const [openValues, setOpenValues] = useState([]);

  //chart properties
  const properties = {
    smoothing: 0.3,
    accent: "palevioletred",
    fillBelow: "rgba(200,67,23,0.1)",
    hover: true,
    gridX: true,
    gridY: true,
  };
  useEffect(() => {
    console.log(location.state.data);
    setCompanyDetail(location.state.data);
    setAssigned(true);
    let high = [];
    let low = [];
    let close = [];
    let open = [];

    //assigning values for chart
    for (let counter = 0; counter < 100; counter++) {
      high.push(location.state.data[counter].high);
      low.push(location.state.data[counter].low);
      close.push(location.state.data[counter].close);
      open.push(location.state.data[counter].open);
    }

    setHighValues(high);
    setLowValues(low);
    setCloseValues(close);
    setOpenValues(open);

    //get specific stock profile
    axios
      .get(
        `https://api.marketstack.com/v1/tickers/${location.state.data[0].symbol}?access_key=6d427f17f573fda98386eecbff4d9ce6`
      )
      .then((res) => {
        console.log(res.data);
        setCompanyName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeChartType = async (type) => {
    let today = moment().format("YYYY/MM/DD");

    if (type == "month") {
      let oneMonthBack = await moment(today)
        .subtract(1, "month")
        .format("YYYY/MM/DD");
      console.log(oneMonthBack, today);
      axios
        .get(
          `https://api.marketstack.com/v1/eod?access_key=6d427f17f573fda98386eecbff4d9ce6&symbols=${location.state.data[0].symbol}&date_from=${oneMonthBack}&date_to=${today}`
        )
        .then((res) => {
          let high = [];
          let low = [];
          let close = [];
          let open = [];

          console.log(res.data);
          //assigning values for chart
          for (let counter = 0; counter < res.data.data.length; counter++) {
            high.push(res.data.data[counter].high);
            low.push(res.data.data[counter].low);
            close.push(res.data.data[counter].close);
            open.push(res.data.data[counter].open);
          }

          setHighValues(high);
          setLowValues(low);
          setCloseValues(close);
          setOpenValues(open);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type == "week") {
      let oneWeekBack = await moment(today)
        .subtract(7, "days")
        .format("YYYY/MM/DD");
      console.log(oneWeekBack, today);
      axios
        .get(
          `https://api.marketstack.com/v1/eod?access_key=6d427f17f573fda98386eecbff4d9ce6&symbols=${location.state.data[0].symbol}&date_from=${oneWeekBack}&date_to=${today}`
        )
        .then((res) => {
          let high = [];
          let low = [];
          let close = [];
          let open = [];

          console.log(res.data);
          //assigning values for chart
          for (let counter = 0; counter < res.data.data.length; counter++) {
            high.push(res.data.data[counter].high);
            low.push(res.data.data[counter].low);
            close.push(res.data.data[counter].close);
            open.push(res.data.data[counter].open);
          }

          setHighValues(high);
          setLowValues(low);
          setCloseValues(close);
          setOpenValues(open);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let high = [];
      let low = [];
      let close = [];
      let open = [];

      //assigning values for chart
      for (let counter = 0; counter < location.state.data.length; counter++) {
        high.push(location.state.data[counter].high);
        low.push(location.state.data[counter].low);
        close.push(location.state.data[counter].close);
        open.push(location.state.data[counter].open);
      }

      setHighValues(high);
      setLowValues(low);
      setCloseValues(close);
      setOpenValues(open);
    }

    setChartType(type);
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row pt-5 text-center">
          <button
            onClick={() => handleChangeChartType("24hr")}
            className={
              "btn btn-sm  m-1" +
              (chartType == "24hr" ? " btn-success" : " btn-primary")
            }
          >
            24hr Chart
          </button>
          <button
            onClick={() => handleChangeChartType("week")}
            className={
              "btn btn-sm m-1" +
              (chartType == "week" ? " btn-success" : " btn-primary")
            }
          >
            Week chart
          </button>
          <button
            onClick={() => handleChangeChartType("month")}
            className={
              "btn btn-sm m-1" +
              (chartType == "month" ? " btn-success" : " btn-primary")
            }
          >
            Month Chart
          </button>
        </div>
        <div className="row pt-4">
          <h4>
            <b className="text-primary">
              {assigned ? <>{companyDetail[0].symbol} </> : <></>}
            </b>{" "}
            - {companyName}
          </h4>
        </div>
        <div className="row pb-5 mb-5 pt-5">
          <div className="col-sm-6">
            <b>
              {companyName} - {chartType} High
            </b>
            <LineGraph data={highValues} {...properties} />
          </div>
          <div className="col-sm-6">
            <b>
              {companyName} - {chartType} Low
            </b>

            <LineGraph data={lowValues} {...properties} />
          </div>
        </div>
        <div className="row pb-5 mb-5">
          <div className="col-sm-6">
            <b>
              {companyName} - {chartType} Close
            </b>

            <LineGraph data={closeValues} {...properties} />
          </div>
          <div className="col-sm-6">
            <b>
              {companyName} - {chartType} Open
            </b>

            <LineGraph data={openValues} {...properties} />
          </div>
        </div>
      </div>
    </>
  );
}
