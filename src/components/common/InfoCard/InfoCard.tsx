import React, { useState, useEffect } from "react";
import { ILegend, ILegends } from "../../../interface";
import Item from "./Item";

import "./styles/index.css";

export interface IInfoCardProps {
  legends: ILegends;
  items: any[];
}

const InfoCard = (props: IInfoCardProps) => {
  const { items, legends } = props;
  return (
    <div className="gio-chart-infocard">
      <div className="title">{items?.[0]?.title}</div>
      {items.map((item: ILegend) => {
        return (
          <div key={item.name}>
            <Item data={item} legend={legends[item.name]} />
          </div>
        );
      })}
    </div>
  );
};

export default InfoCard;
