// see if we can use swr and fetch catalog a better way
import axios from 'axios';
import { Router, useRouter } from 'next/router'
import { CatalogApi, Environment, Client } from 'square';
import useSWR from 'swr';


const fetcher = async (url) => 
{

    console.log("Fetch read", itemId)

 fetch(url).then((res) => res.json());

// const data = await axios
//   .get(
//     `https://connect.squareupsandbox.com/v2/catalog/object/{itemId}`,
//   )
//   .catch(function (error) {
//     console.log(error.toJSON());
//   });
}


export default function Item({itemId}) {
    console.log("it worked", itemId)

    const { data, error } = useSWR(['/api/catalog', itemId.itemId], fetcher)
    console.log("whoop whoop", data)
    console.log("error", error)
    if (error) return <div>oops</div>
    if (!data) return <div>loading</div>

    return<div>
        <h1>success</h1>
    </div>

}
