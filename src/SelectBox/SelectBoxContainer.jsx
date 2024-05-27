import React, { useState } from "react";
import "./selectbox.css";
import { SelectBox } from "./SelectBox";

export const SelectBoxContainer = () => {
  const [optItems, setOptItems] = useState([
    {
      id: 1,
      name: "A11",
      status: false,
    },
    {
      id: 2,
      name: "A12",
      status: false,
    },
    {
      id: 3,
      name: "B11",
      status: false,
    },
    {
      id: 4,
      name: "B12",
      status: false,
    },
    {
      id: 5,
      name: "C11",
      status: false,
    },
    {
      id: 6,
      name: "C12",
      status: false,
    },
    {
      id: 7,
      name: "D11",
      status: false,
    },
    {
      id: 8,
      name: "D12",
      status: false,
    },
    {
      id: 9,
      name: "E11",
      status: false,
    },
    {
      id: 10,
      name: "E12",
      status: false,
    },
  ]);
  const handleChangeOptItems = (e, id) => {
    const newArr = optItems.map((optItem) => {
      if (optItem.id === id) {
        return { ...optItem, status: !optItem.status };
      }
      return optItem;
    });
    setOptItems(Array.from(newArr));
  };
  const handleDeleteOptItems = (e, id) => {
    const newArr = optItems.map((optItem) => {
      if (optItem.id === id) {
        return { ...optItem, status: false };
      }
      return optItem;
    });
    setOptItems(Array.from(newArr));
  };
  const handleClearAll = (e) => {
    const newArr = optItems.map((optItem) => {
      return { ...optItem, status: false };
    });
    setOptItems(Array.from(newArr));
  };
  return (
    <div className="select-container">
      <SelectBox
        optItems={optItems}
        handleChangeOptItems={handleChangeOptItems}
        handleDeleteOptItems={handleDeleteOptItems}
        handleClearAll={handleClearAll}
      />
    </div>
  );
};
