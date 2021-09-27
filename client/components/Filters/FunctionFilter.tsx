import React, { useState, useEffect } from "react";
import axios from "axios";
import { PositionFunction } from "@/models/models";

import PosFunction from "./PosFunction";

const FunctionFilter = () => {
  const [positionFunc, setPositionFunc] = useState(
    [] as Array<PositionFunction>
  );
  const [showOptions, setShowOptions] = useState(false);

  const hideFilters = ({ target }: any) => {
    if (!target.getAttribute("data-func-filter")) setShowOptions(false);
  };

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const { data } = await axios.get(`${API_URL}/position-functions/?page_size=100`);
      setPositionFunc(data.results);
    })();

    document.addEventListener("click", hideFilters);

    return () => {
      document.removeEventListener("click", hideFilters);
    };
  }, []);

  return (
    <div className="select">
      <div
        className="selected"
        onClick={() => setShowOptions((s) => !s)}
        data-func-filter="true"
      >
        <span data-func-filter="true">Filter By Positions</span>
        <i className="fas fa-caret-down" data-func-filter="true"></i>
      </div>
      <div className="options func-filter" style={{display: showOptions ? "block" : "none"}}>
        {positionFunc.map((x: PositionFunction) => (
          <PosFunction key={x.id} func={x} />
        ))}
      </div>
    </div>
  );
};

export default FunctionFilter;
