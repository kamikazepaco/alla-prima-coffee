import { PaymentForm, CreditCard, Ach } from 'react-square-web-payments-sdk'


const MyPaymentForm = () => {
  return (
    <PaymentForm
      applicationId= 'sandbox-sq0idb-sFYz-wegQ3xweJMRFCAQog'
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
      <CreditCard />
      <p></p>

      <Ach accountHolderName="John Dont" redirectURI="https://example.com/" transactionId="54321" />
    </PaymentForm>
  )
}



export default MyPaymentForm
