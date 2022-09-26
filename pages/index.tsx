import { CreditCard, Ach } from 'react-square-web-payments-sdk'

const MyPaymentForm = () => {
  return (
    <>
      <CreditCard />
      <p></p>

      <Ach accountHolderName="John Dont" redirectURI="https://example.com/" transactionId="54321" />
    </>
  )
}



export default MyPaymentForm
