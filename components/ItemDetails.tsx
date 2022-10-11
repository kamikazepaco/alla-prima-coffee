import axios from "axios";
import React from "react";
import { Client, Environment } from "square";

const ItemDetails = ({ itemId, data }: any) => {
  // console.log("here it is", data.data);
  const itemData = data.data.itemData;
  console.log("test", itemData);

  return (
    <>
      <div>ItemDetails is {itemId}</div>
      <h1> this is a page for {itemData.name}</h1>
      <h1>
        this is the desc of {itemData.name}: {itemData.description}
      </h1>
    </>
  );
};

export default ItemDetails;
