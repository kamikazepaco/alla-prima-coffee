import { useRouter } from "next/router";
import Catalog from "./components/Catalog"

export default function ItemPage() {
    const router = useRouter();
    const { PID } = router.query
    return (
        <Catalog PID={PID} />
    )
}
