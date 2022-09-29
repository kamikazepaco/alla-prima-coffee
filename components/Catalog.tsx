// see if we can use swr and fetch catalog a better way

import useSWR from 'swr';

const fetchCatalog = async (PID) => await
fetch(
    `https://connect.squareupsandbox.com/v2/catalog/object/${PID}`
).then((res) => res.json());

export default function Catalog({ PID }) {
    const { data, error } = useSWR(PID, fetchCatalog)
    console.log(data)

    if (error) return <div>oops</div>
    if (!data) return <div>loading</div>

    return<div>
        <h1>success</h1>
    </div>

}
