import Head from "next/head"
import Hero from '../components/Hero'
import Subscriptions from '../components/Subscriptions'
import Beans from '../components/Beans'



export default function Home() {
  
  return(
  <div className="styles container">
    <Head>
      <title>Alla Prima Coffee Roaster | Pensacola, FL</title>
      <meta name="description" content="World-class coffee in Pensacola, FL" />
      <link rel="icon" href="/favicon.ico"  />
    </Head>
    <Hero />
    <Subscriptions />
    <Beans />
  </div>
  )
}
