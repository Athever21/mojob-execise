import React from "react";
import "@/styles/Filters.scss";

import PageFilter from "./PageFilter";
import FunctionFilter from "./FunctionFilter";

const Filters = () => {
  return (
    <div className="filters">
      <FunctionFilter />
      <PageFilter />
    </div>
  );
};

export default Filters;
