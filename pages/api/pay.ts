// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client, Environment, ApiError } from 'square';
import { randomUUID } from 'crypto';
(BigInt.prototype as any).toJSON = function() { return this.toString(); }

const { paymentsApi, catalogApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
})

console.info("New Client created", paymentsApi)
export default async function handler(req, res) {
  if ( req.method === 'POST') {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: 'USD',
        amount: 100
      }
    })
    console.log("the api token handler returned", result);
    res.status(200).json(result);
  } else {
    res.status(500).send();
  }
}

console.info('boo', catalogApi)
try {
  const { result} = await catalogApi.listCatalog();
  console.log(result)
  // const { statusCode, headers } = httpResponse;
} catch(error) {
  if (error instanceof ApiError) {
    const errors = error.result;
    // const { statusCode, headers } = error;
  }
}
