import React, { useState } from "react";
import { PositionFunction } from "@/models/models";
import { useJob } from "@/JobProvider";

const PosFunction = ({ func }: { func: PositionFunction }) => {
  const { addFuncFilter, removeFuncFilter, setPage } = useJob() as any;
  const [showChildren, setShowChildren] = useState(false);

  const handleChange = (target: any, pos: PositionFunction, parent: Boolean) => {
    setPage(1);
    if (parent) setShowChildren((s) => !s);
    if (target.checked) {
      addFuncFilter(pos.id.toString());
    } else {
      if (parent) {
        // @ts-ignore ja pierdole
        for (const child of pos.children) {
          removeFuncFilter(child.id.toString());
        }
      }
      removeFuncFilter(pos.id.toString());
    }
  }

  return (
    <div data-func-filter="true" className="func">
      <div className="func-parent option" data-func-filter="true">
        <input
          type="checkbox"
          data-func-filter="true"
          id={func.id.toString()}
          onChange={({target}: any) => handleChange(target, func, true)}
        />
        <label data-func-filter="true" htmlFor={func.id.toString()}>
          {func.name_en}
        </label>
      </div>
      {showChildren && (
        <div className="func-children" data-func-filter="true">
          {/* @ts-ignore */}
          {func.children.map((x: PositionFunction) => (
            /* @ts-ignore */
            <div className="option" data-func-filter="true" key={x.id}>
              <input
                type="checkbox"
                data-func-filter="true"
                onChange={({target}: any) => handleChange(target, x, false)}
                id={x.id.toString()}
              />
              <label data-func-filter="true" htmlFor={x.id.toString()}>
                {x.name_en}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PosFunction;
