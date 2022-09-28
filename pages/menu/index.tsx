import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Client, Environment } from 'square'
(BigInt.prototype as any).toJSON = function() { return this.toString(); }
import fallback from '../../public/IMG_1226.jpeg'



const Menu = ({relData, data}) => {

    const mergeArr2 = data.map( a => {
        const matched = relData.find(b => b.id === a.itemData.imageIds)
        if(matched) {
            return {...data,...matched}

        } else {
            return {...data}
        }
    })

    var mergeArr = data.map((a:any) => Object.assign(a, relData.find((b:any) => b.id == a.itemData.imageIds)));

   console.log(mergeArr2)


   function onErrorImage(e) {
    e.target.src = fallback
 }

  return (
    <div>
        <h1>Menu</h1>

        {mergeArr && mergeArr.map((item:any) =>(
            <>
                <Image src={ item.imageData.url } onErrorCapture={onErrorImage}
                width={150} height={150}
                />
                <p>** {item.itemData.name} ITEM ID IS {item.itemData.variations[0].itemVariationData.itemId}</p>
                <h2>{item.itemData.name}</h2>
                <h3>{ item.itemData.description}</h3>

                {item.itemData.variations.map(variation => (
                // this is my current solution for displaying price variations. its not elegant, but it gets the job done. God speed when it comes to importing the image
                <>
                <p>{variation.itemVariationData.name}:</p>
                <p> $ {`${(Math.round(variation.itemVariationData.priceMoney.amount) / 100).toFixed(2) }`}
                </p>

                </>
            ))}
                <hr></hr>
            </>
        ))}


        {/* { results && results.objects.map(items  => (
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
        ))} */}


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

    const res = await catalogApi.searchCatalogObjects({
        objectTypes: [
          'ITEM',

        ],
        includeDeletedObjects: false,
        includeRelatedObjects: true
      });

     const data = res.result.objects
     const rel = res.result.relatedObjects

     console.log(res.result)


      return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
            relData: JSON.parse(JSON.stringify(rel)),

        }
      }

    // const {result } = await catalogApi.listCatalog(undefined, 'ITEM');
    // // const data = await res.json();

    // const oof = await catalogApi.searchCatalogObjects({
    //     objectTypes: [
    //       'IMAGE'
    //     ],
    //     includeDeletedObjects: false,
    //     includeRelatedObjects: true
    //   });


    // console.log("image JSON is", oof.body);

    // return {
    //     props: {
    //         data: JSON.parse(oof.body.toString()),
    //         results: JSON.parse(JSON.stringify(result))
    //     }
    // }
}
