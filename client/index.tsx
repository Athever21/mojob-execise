import React from "react";
import { render } from "react-dom";
import App from "./App";
import JobProvider from "./JobProvider";
import "./style.scss";

render(
  <JobProvider>
    <App />
  </JobProvider>,
  document.getElementById("root")
);