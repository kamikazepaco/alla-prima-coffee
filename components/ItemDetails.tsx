import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Client, Environment } from "square";

const ItemDetails = ({ itemId }) => {
  // console.log("here it is", data.data);
  // const itemData = data.data.itemData;
  // console.log("test", itemData);
  const router = useRouter();
  console.log("fuck", router.query.itemId);
  console.log("fuck this");

  return (
    <>
      <div>ItemDetails is {router.query.itemId}</div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const itemId = ctx.query.itemId;
  console.log("bro");
  console.log(itemId);
  const config = {
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  };

  const { catalogApi } = new Client(config);

  try {
    const response = await catalogApi.retrieveCatalogObject(itemId, true);
    const data = JSON.parse(JSON.stringify(response.result));
    const relData = JSON.parse(JSON.stringify(response.result.relatedObjects));
    console.log("in itemDetail", response.result);
    return {
      props: {
        data: data,
        relData: relData,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default ItemDetails;
