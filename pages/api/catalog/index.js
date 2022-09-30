import { Client, Environment } from "square";

export default async function handler(req, res) {
  const { method } = req;
  

  const config = {
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  };

  const { catalogApi } = new Client(config);

  if(method === "GET") {
    try {
        const response = await catalogApi.retrieveCatalogObject(`${itemId}`,
        true);

        console.log("in API folder", response.result);
      } catch(error) {
        console.log(error);
      }
  }
}
