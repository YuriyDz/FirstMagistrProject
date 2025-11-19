import { useState } from "react";
import axios from "axios";





export const CardTable = ({ TableData, setTB }) => {
  console.log(TableData);

  return (
    <div>
      {TableData === undefined || TableData.length === 0
        ? null
        : TableData[1].map((n, i) => (
            <div style={{backgroundColor: "red"}}>
              <span>{n.name}</span>
              <span>{n.date}</span>
            </div>
          ))}
    </div>
  );
};

