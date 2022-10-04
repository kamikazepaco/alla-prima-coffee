import Head from "next/head"
import Hero from '../components/Hero'



export default function Home() {
  
  return(
  <div className="styles container">
    <Head>
      <title>Alla Prima Coffee Roaster | Pensacola, FL</title>
      <meta name="description" content="World-class coffee in Pensacola, FL" />
      <link rel="icon" href="/favicon.ico"  />
    </Head>
    <Hero />
  </div>
  )
}
