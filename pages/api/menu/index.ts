import { Client, Environment } from "square";

export default async function handler(req, res) {
  const { method } = req;

  const config = {
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  };

  const { catalogApi } = new Client(config);

  if (method === "GET") {
    try {
      const data = await catalogApi.searchCatalogObjects({
        objectTypes: ["ITEM"],
        includeDeletedObjects: false,
        includeRelatedObjects: true,
      });

      console.log("api pull success!");

      return res.status(200).json(data.result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
