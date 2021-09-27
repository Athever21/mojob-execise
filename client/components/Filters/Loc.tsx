import React, { useState } from "react";
import { JobLocation } from "@/models/models";
import { useJob } from "@/JobProvider";

const Loc = ({ loc, offset }: { loc: JobLocation; offset: Number }) => {
  const { setLocationFilters, setPage } = useJob() as any;
  const [showChildren, setShowChildren] = useState(false);

  // @ts-ignore
  const handleChange = (target: any, location: JobLocation) => {
    setPage(1);
    if (target.checked) {
      setLocationFilters((s: any) => {
        const newObj = {...s};
        // @ts-ignore
        newObj[location.type] = [...s[location.type],location.name];
        return newObj;
      })
    } else {
      setLocationFilters((s: any) => {
        const newObj = {...s};
        // @ts-ignore
        newObj[location.type] = s[location.type].filter((x: any) => x !== location.name);
        return newObj;
      })
    }
    console.log(target, loc);
  };

  return (
    <div data-loc-filter="true" className="func">
      <div
        className="func-parent option"
        data-loc-filter="true"
        style={{ paddingLeft: `${offset}rem` }}
      >
        <input
          // @ts-ignore*
          id={loc.type + loc.name}
          type="checkbox"
          data-loc-filter="true"
          className="loc-input"
          onChange={({target}: any) => handleChange(target, loc)}
        />
        <label
          onClick={() => setShowChildren((s) => !s)}
          data-loc-filter="true"
          // @ts-ignore
          htmlFor={loc.type + loc.name}
        >
          {loc.name}
        </label>
      </div>
      {showChildren && loc.children?.length && (
        <div className="func-children" data-loc-filter="true">
          {/* @ts-ignore */}
          {loc.children.map((x: JobLocation) => (
            /* @ts-ignore */
            <Loc key={x.name} loc={x} offset={offset + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Loc;
