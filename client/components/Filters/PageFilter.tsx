import React, { useState, useEffect } from "react";
import { useJob } from "@/JobProvider"; 

const pageFilters = [
  ["5", "5 per page"],
  ["25", "25 per page"],
  ["all", "Display all"],
];

const PageFilter = () => {
  const { setPageSize, setPage } = useJob() as any;
  const [currPageFilter, setCurrPageFilter] = useState([
    "5",
    "5 per page",
  ] as Array<String>);
  const [showOptions, setShowOptions] = useState(false);

  const handlePageChange = (filter: Array<String>) => {
    setPageSize(filter[0]);
    setPage(1);
    setCurrPageFilter(filter);
    setShowOptions(false);
  };

  const hideFilters = ({target}: any) => {
    if (!target.getAttribute('data-page-filter')) setShowOptions(false);
  }

  useEffect(() => {
    document.addEventListener('click', hideFilters);

    return () => {
      document.removeEventListener('click', hideFilters);
    }
  },[])

  return (
    <div className="select page-filter">
      <div className="selected" onClick={() => setShowOptions((s) => !s)} data-page-filter="true">
        <div className="shadow">
          {pageFilters.reduce((a, b) => (b[1].length > a[1].length ? b : a))[1]}
        </div>
        <span style={{position: "absolute"}} data-page-filter="true">{currPageFilter[1]}</span>
        <i className="fas fa-caret-down" data-page-filter="true"></i>
      </div>
      {showOptions && (
        <div className="options" >
          {pageFilters.map((x) => {
            if (x[0] != currPageFilter[0]) {
              return (
                <div
                  key={x[0]}
                  onClick={() => handlePageChange(x)}
                  data-value={x[0]}
                  data-page-filter="true"
                  className="option"
                >
                  {x[1]}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default PageFilter;
