import Head from "next/head"
import Hero from '../components/Hero'
import EmblaCarousel from '../components/EmblaCarousel'


export default function Home() {
  //had class name of styles container on div
  return(
  <div className=""> 
    <Head>
      <title>Alla Prima Coffee Roaster | Pensacola, FL</title>
      <meta name="description" content="World-class coffee in Pensacola, FL" />
      <link rel="icon" href="/favicon.ico"  />
    </Head>
    <Hero />
    <EmblaCarousel />
  </div>
  )
}
