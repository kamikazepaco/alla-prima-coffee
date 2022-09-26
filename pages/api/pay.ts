// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';
(BigInt.prototype as any).toJSON = function() { return this.toString(); }

const { paymentsApi } = new Client({
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
