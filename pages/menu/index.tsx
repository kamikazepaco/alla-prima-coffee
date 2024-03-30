import Image from 'next/image';
import React, { useEffect, useState } from 'react'
// import {Modal} from "../../components/modal";
import Modal from 'react-modal';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import Item  from '../../components/ItemDetails';
import ProductId from './[ProductId]';
import styles from '../../styles/Menu.module.css'


(BigInt.prototype as any).toJSON = function() { return this.toString(); }

Modal.setAppElement("#__next")

const Menu = ({relData, data}) => {
  //Square's API doesnt pass the Img url with the item data. After 4 days, 17 cups of coffee, 100s of stack overflow research, and half a bottle of whiskey, I found the below method of combining the arrays to be best. Unfortunately, It makes the parent ID the img id instead of the item ID. In order to generate the pages for each item (not needed for the site, but good practice), I've located the item ID in the following path of the new array << item.itemData.variations[0].itemVariationData.itemId >>   All items will ALWAYS have a variation, so we can specify the first array to ensure a single, 'clean' ID pull
  const router = useRouter()
  
    var items = data.map((a:any) => Object.assign(a, relData.find((b:any) => b.id == a.itemData.imageIds)));

  return (
    <div>
      <h1>Menu</h1>

      {items &&
        items.map((item: any) => (
          
          <>
            <div className={styles.Menu_container}>
              <Image 
                src={item.imageData.url}
                width={200}
                height={200}
                alt={item.imageData}
              />
              <div className={styles.Menu_container_text}>
                <p>
                  ** {item.itemData.name} ITEM ID IS{" "}
                  {item.itemData.variations[0].itemVariationData.itemId}
                </p>
                <h2 className='text-6xl'>{item.itemData.name}</h2>
                <h3>{item.itemData.description}</h3>
              
              </div>
              
            </div>
            
            <Link
              href={`/menu/?itemId=${item.itemData.variations[0].itemVariationData.itemId}`}
              as={`/menu/${item.itemData.name}?itemId=${item.itemData.variations[0].itemVariationData.itemId}`}
            >
              <a>
                <h4>Details</h4>
              </a>
            </Link>
            <div className={styles.Menu_container_price}>
            {item.itemData.variations.map((variation) => (
              // this is my current solution for displaying price variations. its not elegant, but it gets the job done. God speed when it comes to importing the image
              //attempting to use counter to iterate variation numbers for the 'more info' section
              
              <>
              <div >
                <div>
                <p className='text-3xl flex'>{variation.itemVariationData.name}:</p>
                
                <p>
                  {" "}
                  ${" "}
                  {`${(
                    Math.round(variation.itemVariationData.priceMoney.amount) /
                    100
                  ).toFixed(2)}`}
                </p>
                <Link
                  href={`/menu/?itemId=${variation.id}`}
                  as={`/menu/${item.itemData.name}?itemId=${variation.id}`}
                >
                  <a>
                    <h4>More Info</h4>
                  </a>
                </Link>
              </div>
              </div>
              </>
            ))}
            </div>
            
            <hr className='py-4'></hr>
          </>
        ))}
        

      <Modal isOpen={!!router.query.itemId} onRequestClose={() => router.push("/menu")}>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
        <p> </p>
       
        <ProductId itemId={router.query.itemId} />
      </Modal>
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
//  <Item itemId={router.query.itemId} /> INSIDE MODAL