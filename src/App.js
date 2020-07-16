import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CurrentMarket from "./Components/CurrentMarket";
import DetailedOverview from "./Components/DetailedOverview";
import Charting from "./Components/Charting";
import DetailedOverviewTable from "./Components/DetailedOverview-Table";
import DetailedOverviewSpecific from "./Components/DetailedOverview-specific";
import CryptoOverview from "./Components/CryptoOverview";
import CryptoSpecific from "./Components/CryptonSpecific";
import ChartingSpecific from "./Components/Charting-specific";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={DetailedOverview} exact />
        <Route
          path="/stockmarket-livemarket-overview"
          component={CurrentMarket}
        />
        <Route path="/detailed-stockprice" component={DetailedOverview} exact />
        <Route path="/stockmarket-charting" component={Charting} exact />
        <Route
          path="/stockmarket-charting/specific"
          component={ChartingSpecific}
          exact
        />
        <Route
          path="/detailed-stockprice/table"
          component={DetailedOverviewTable}
          exact
        />
        <Route
          path="/cryptocurrency-overview"
          component={CryptoOverview}
          exact
        />
        <Route
          path="/cryptocurrency-overview/specific"
          component={CryptoSpecific}
          exact
        />
        <Route
          path="/detailed-stockprice/specific"
          component={DetailedOverviewSpecific}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
