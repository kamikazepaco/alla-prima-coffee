import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Modal from "react-modal";
import Link from 'next/link';
import axios from 'axios';
(BigInt.prototype as any).toJSON = function() { return this.toString(); }

Modal.setAppElement("#__next")

const Menu = ({relData, data}) => {
    //Square's API doesnt pass the Img url with the item data. After 4 days, 17 cups of coffee, 100s of stack overflow research, and half a bottle of whiskey, I found the below method of combining the arrays to be best. Unfortunately, It makes the parent ID the img id instead of the item ID. In order to generate the pages for each item (not needed for the site, but good practice), I've located the item ID in the following path of the new array << item.itemData.variations[0].itemVariationData.itemId >>   All items will ALWAYS have a variation, so we can specify the first array to ensure a single, 'clean' ID pull

    var items = data.map((a:any) => Object.assign(a, relData.find((b:any) => b.id == a.itemData.imageIds)));
    console.log(items)


  return (
    <div>
      <h1>Menu</h1>
      {items &&
        items.map((item: any) => (
          <>
            <Image
              src={`${
                item.imageData?.url ||
                "https://images.squarespace-cdn.com/content/v1/60d9bda05f2faf5b5587197e/1626686508702-EZGYKT0UQ1AMJ8ULFCEC/logotype.png?format=750w"
              }`}
              width={150}
              height={150}
              alt={item.itemData.name}
            />
            <p>
              ** {item.itemData.name} ITEM ID IS{" "}
              {item.itemData.variations[0].itemVariationData.itemId}
            </p>
            <h2>{item.itemData.name}</h2>
            <h3>{item.itemData.description}</h3>

            {/* In order to reduce amount of API calls/Just have the ID needed for each new page, I passed a quesry within the Link that contains the itemId and image logic. for educational purposes, the [id] pages will probably use getStaticPros */}
            
            {/* I wanted a way to pass link as item's name. theo nly way to do so and have the code persistent on reload was to pass itemId in query for initial pull and as key in URL for reload/sharing link. more research required  */}
            <Link
              href={{
                pathname: `/menu/[ProductId]`,
                query: {
                  itemId: item.itemData.variations[0].itemVariationData.itemId,
                  imageId: `${
                    item.imageData?.url ||
                    "https://images.squarespace-cdn.com/content/v1/60d9bda05f2faf5b5587197e/1626686508702-EZGYKT0UQ1AMJ8ULFCEC/logotype.png?format=750w"
                  }`,
                },
              }}
              as={`/menu/${item.itemData.name}?itemId=${item.itemData.variations[0].itemVariationData.itemId}`}
              passHref
            >
              <a>
                <h4>Details</h4>
              </a>
            </Link>

            {item.itemData.variations.map((variation) => (
              // this is my current solution for displaying price variations. its not elegant, but it gets the job done. God speed when it comes to importing the image
              <>
                <p>{variation.itemVariationData.name}:</p>
                <p>
                  {" "}
                  ${" "}
                  {`${(
                    Math.round(variation.itemVariationData.priceMoney.amount) /
                    100
                  ).toFixed(2)}`}
                </p>
              </>
            ))}
            <hr></hr>
          </>
        ))}

      {/* <Modal isOpen='true'>
          <div>In the modal</div>
        </Modal> */}
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/menu/");

  
  return {
    props: {
      data: res.data.objects,
      relData: res.data.relatedObjects
    },
  };
};


export default Menu


// could probably move to a separate component, but I actually dont know.


// export async function getServerSideProps(){
//     console.log('hello world! kinda..');

//     const config = ({
//         accessToken: process.env.SQUARE_ACCESS_TOKEN,
//         environment: Environment.Sandbox,
//     });

//     const { catalogApi } = new Client(config);

//     const res = await catalogApi.searchCatalogObjects({
//         objectTypes: ['ITEM'],
//         includeDeletedObjects: false,
//         includeRelatedObjects: true
//       });

//     //separate first JSON object from second. first carries Item info and second carries related objects. Thats all including images, categories, tax, etc.
//     const data = res.result.objects
//     const rel = res.result.relatedObjects

//     console.log(res.result)

//       //consider refactoring so that only needed data is sent to client
//     return {
//       props: {
//           data: JSON.parse(JSON.stringify(data)),
//           relData: JSON.parse(JSON.stringify(rel)),
//       }
//     }
// }
