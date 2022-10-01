// see if we can use swr and fetch catalog a better way
import axios from 'axios';
import { useRouter } from 'next/router'
import { CatalogApi, Environment, Client } from 'square';
import useSWR from 'swr';

const fetchItem = async (itemId) => {
    const config = {
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox,
    };

    const { catalogApi } = new Client(config);

//   await axios.get(`https://connect.squareupsandbox.com/v2/catalog/object/${itemId}`)
//     .then(function (response) {
//       console.log("test", response.data);
//     });
// }



await axios.get(
    `https://connect.squareupsandbox.com/v2/catalog/object/${itemId}`
).then(function (response) {
    console.log('finalllllllllly')
});

{
  const config = {
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  };

  const { catalogApi } = new Client(config);

const response = await catalogApi.retrieveCatalogObject(`${itemId}`);

console.log(response.result);

}



export default function Item() {
    const router = useRouter()
    const {itemId} = router.query
    console.log(itemId)

    const { data, error } = useSWR(itemId, fetchItem)
    console.log("whoop whoop", data)

    if (error) return <div>oops</div>
    if (!data) return <div>loading</div>

    return<div>
        <h1>success</h1>
    </div>

}
