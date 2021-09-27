import React from "react";
import "@/styles/Filters.scss";

import PageFilter from "./PageFilter";
import FunctionFilter from "./FunctionFilter";
import Location from "./Location";

const Filters = () => {
  return (
    <div className="filters">
      <FunctionFilter />
      <Location />
      <PageFilter />
    </div>
  );
};

export default Filters;
