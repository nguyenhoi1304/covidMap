import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoot from "./appRoot";

let basename = "";
ReactDOM.render(
        <Router basename={basename}>
            <AppRoot />
        </Router>
    , document.getElementById("root"));