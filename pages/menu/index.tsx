import Image from 'next/image';
import React from 'react'
import { Client, Environment } from 'square'
(BigInt.prototype as any).toJSON = function() { return this.toString(); }


const Menu = ({results, data}) => {
    console.log(data);


  return (
    <div>
        <h1>Menu</h1>
        { results && results.objects.map(items  => (
            <>
            <h2>{ items.itemData.name }</h2>
            <h3> { items.itemData.description} </h3>
            <h3> { items.id } </h3>

            { data && data.objects.map(bro => (
                <>
                <h2>{bro.id}</h2>
                </>
            ))}
            {items.itemData.variations.map(variation => (
                // this is my current solution for displaying price variations. its not elegant, but it gets the job done. God speed when it comes to importing the image
                <>
                <p>{variation.itemVariationData.name}:</p>
                <p> $ {`${(Math.round(variation.itemVariationData.priceMoney.amount) / 100).toFixed(2) }`}
                </p>

                </>
            ))}

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

    const oof = await catalogApi.searchCatalogObjects({
        objectTypes: [
          'IMAGE'
        ],
        includeDeletedObjects: false,
        includeRelatedObjects: true
      });


    console.log("image JSON is", oof.body);

    return {
        props: {
            data: JSON.parse(oof.body.toString()),
            results: JSON.parse(JSON.stringify(result))
        }
    }
}
