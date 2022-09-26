import React from 'react'
import { Client, Environment } from 'square'
(BigInt.prototype as any).toJSON = function() { return this.toString(); }


const Menu = ({results}) => {
    console.log(results);
  return (
    <div>
        <h1>Menu</h1>
         

        { results && results.objects.map(items  => (
            <>
           <h2>{ items.itemData.name }</h2>
            <h3> { items.itemData.description} </h3>
           <ul>
            <li>Small: $</li>
            <li>Medium: $</li>
            <li>Large: $</li>
           </ul>
           </>
        ))}
    </div>
  )
}

export default Menu

export async function getServerSideProps(){
    console.log('hello world! kinda..');
    
    const config = ({
        accessToken: process.env.SQUARE_ACCESS_TOKEN,
        environment: Environment.Sandbox,
    });

    const { catalogApi } = new Client(config);

    const {result } = await catalogApi.listCatalog(undefined, 'ITEM');
    // const data = await res.json();

    console.log("the api token handler returned", result);
    
    return {
        props: {
            results: JSON.parse(JSON.stringify(result))
        }
    }
}