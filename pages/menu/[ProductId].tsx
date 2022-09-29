import { useRouter } from "next/router"
import { Client, Environment } from "square";


export default function ProductId() {
    const router = useRouter();
    const { itemId, ProductId} = router.query
    console.log(router.query.itemId)
    const item = router.query.itemId
  const refreshData = () => {
    router.replace(router.asPath);
  };

    return <div>I am a {ProductId} with an ID of {itemId}</div>
}


// export const getServerSideProps = (context) => {
//     console.log(context.query.itemId)
//     return {
//         props: {
//             data: 'boo'
//         }
//     }
// }



export const getServerSideProps = async (context: any) => {

    const {itemId} = context.query
  const config = {
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  };

  const { catalogApi } = new Client(config);

  if (itemId){

    try {
        const response = await catalogApi.retrieveCatalogObject(`${itemId}`,
        true);
        console.log("Yaaaas")
        console.log(response.result);
        return {
            props: {
                data: 'boo'
            }
        }
      } catch(error) {
        console.log(error);
      }
    } else {
        console.log('oh no')
        return { props: {}, };
    }
    
}






// export const getServerSideProps = ({ context }) => {
//     return {
//       props: {
//         id: context.query.id
//       }
//     }
//   }
