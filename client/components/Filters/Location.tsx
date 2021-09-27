import React, { useState, useEffect } from "react";
import axios from "axios";
import { JobLocation } from "@/models/models";

import Loc from "./Loc";

const LocationFilter = () => {
  const [positionFunc, setPositionFunc] = useState(
    [] as Array<JobLocation>
  );
  const [showOptions, setShowOptions] = useState(false);

  const hideFilters = ({ target }: any) => {
    if (!target.getAttribute("data-loc-filter")) setShowOptions(false);
  };

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const { data } = await axios.get(`${API_URL}/locations/`);
      console.log(data)
      setPositionFunc(data);
    })();

    document.addEventListener("click", hideFilters);

    return () => {
      document.removeEventListener("click", hideFilters);
    };
  }, []);

  return (
    <div className="select">
      <div
        className="selected loc"
        onClick={() => setShowOptions((s) => !s)}
        data-func-filter="true"
      >
        <span data-loc-filter="true">Filter By Location</span>
        <i className="fas fa-caret-down" data-func-filter="true"></i>
      </div>
      <div className="options func-filter" style={{display: showOptions ? "block" : "none"}}>
        {positionFunc.map((x: JobLocation) => (
          <Loc key={x.name} loc={x} offset={0.5}/>
        ))}
      </div>
    </div>
  );
};

export default LocationFilter;
