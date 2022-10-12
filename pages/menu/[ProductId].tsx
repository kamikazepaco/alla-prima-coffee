import { useRouter } from "next/router";
import { Client, Environment } from "square";
import ItemDetails from "../../components/ItemDetails";

export default function ProductId() {
  const router = useRouter();

  const { itemId, ProductId } = router.query;
  console.log("here");
  // console.log("rel", relData);

  return (
    <div>
      <div>
        I am a {ProductId} with an ID of {itemId}
      </div>
      <div>
        <ItemDetails itemId={itemId} />
      </div>
    </div>
  );
}

// export const getServerSideProps = async (context: any) => {
//   const { itemId } = context.query;
//   console.log(context.query);
//   const config = {
//     accessToken: process.env.SQUARE_ACCESS_TOKEN,
//     environment: Environment.Sandbox,
//   };

//   const { catalogApi } = new Client(config);

//   try {
//     const response = await catalogApi.retrieveCatalogObject(itemId, true);
//     const data = JSON.parse(JSON.stringify(response.result.object));
//     const relData = JSON.parse(JSON.stringify(response.result.relatedObjects));
//     console.log("in PID", relData);
//     return {
//       props: {
//         data: data,
//         relData: relData,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };
