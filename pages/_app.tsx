import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PaymentForm } from 'react-square-web-payments-sdk'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaymentForm
      applicationId='sandbox-sq0idb-sFYz-wegQ3xweJMRFCAQog'
      locationId='LCK5A68VEZ0NF'
      cardTokenizeResponseReceived={ async (token, buyer) => {
        const response = await fetch('api/pay', {
          method: "POST",
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify({
            sourceId: token.token
          })
        })
        alert(JSON.stringify(await response.json(), null, 2));
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PaymentForm>
  )
}

export default MyApp
