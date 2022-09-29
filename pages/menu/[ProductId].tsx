import { useRouter } from "next/router"



export default function ProductId({id}) {
    const router = useRouter();
    const { itemId, ProductId} = router.query
    console.log(router.query)
    return <div>I am a {ProductId} with an ID of {itemId}</div>
}



// export const getServerSideProps = ({ context }) => {
//     return {
//       props: {
//         id: context.query.id
//       }
//     }
//   }
