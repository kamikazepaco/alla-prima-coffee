import { useRouter } from "next/router";
import { Client, Environment } from "square";

export default async function handler(req, res) {
  console.log("here", req)
  const { method, itemId } = req;



  const client = new Client({
    environment: Environment.Sandbox,
    accessToken: "ACCESS_TOKEN",
  });


  // client.search({itemId: itemId.itemId}).then((resp) => {
  //   res.status(200).json(resp.data)
  // })
  // .catch((error) => {
  //   console.log('ya boofing')
  // })

  if(method === "GET") {
    try {
        const response = await client.catalogApi.retrieveCatalogObject( req.query.itemId ,
        true);

        console.log("in API folder", response.result);
      } catch(error) {
        console.log("boofing error", error);
      }
  }
}
