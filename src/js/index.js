import React from "react";
import ReactDOM from "react-dom";

import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/index.scss";

import Layout from "./layout";

ReactDOM.render(<Layout />, document.querySelector("#app"));
