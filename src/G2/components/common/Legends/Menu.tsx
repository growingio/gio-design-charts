import React from "react";
import Legend from "./Legend";

const Menu = (props: any) => {
  const { legends, onClick } = props;
  return (
    <div className="dropdown">
      <span>其余5项</span>
      <div className="dropdown-content">
        {Object.keys(legends).map((label: string) => {
          const legend = legends[label] || {};
          return (
            <div key={label} className="dropdown-item">
              <Legend label={label} data={legend} onClick={onClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
