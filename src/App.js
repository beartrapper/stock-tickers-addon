import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CurrentMarket from "./Components/CurrentMarket";
import DetailedOverview from "./Components/DetailedOverview";
import Charting from "./Components/Charting";
import DetailedOverviewTable from "./Components/DetailedOverview-Table";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/market-overview" component={CurrentMarket} />
        <Route path="/detailed-quote" component={DetailedOverview} exact />
        <Route path="/charting" component={Charting} />
        <Route path="/detailed-quote/table" component={DetailedOverviewTable} />
      </Switch>
    </Router>
  );
}

export default App;
