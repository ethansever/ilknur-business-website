import Head from "next/head"
import Image from "next/image"
import BsCard from "../components/BsCard"
import BsCarousel from "../components/BsCarousel"
import CallbackForm from "../components/CallbackForm"
import CardsCarousel from "../components/CardsCarousel"
import CtaArea from "../components/CtaArea"
import PersonFeatures from "../components/PersonFeatures"
import { fetchAdminPanelAPI } from "../lib/adminPanelApi"

function Home({ personFeatures, sliders }) {
  return (
    <main className="home-page">
      <Head>
        <title>Ilknur Sever - Anasayfa</title>
      </Head>
      <BsCarousel sliders={sliders.data} />
      <CtaArea />
      <section>
        {personFeatures.data && (
          <PersonFeatures personFeatures={personFeatures.data} />
        )}
      </section>
      <section>
        <CardsCarousel />
      </section>
      <section>
        <CallbackForm />
      </section>
      <section>
        <div className="container latest-educations">
          <div className="row">
            <div className="col-lg-4">
              <BsCard cardFrame={true} />
            </div>
            <div className="col-lg-4">
              <BsCard cardFrame={true} />
            </div>
            <div className="col-lg-4">
              <BsCard cardFrame={true} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function getServerSideProps() {
  const [personFeaturesRes, slidersRes] = await Promise.all([
    fetchAdminPanelAPI("/person-features"),
    fetchAdminPanelAPI("/sliders", { populate: "image" }),
  ])

  const [personFeatures, sliders] = await Promise.all([
    personFeaturesRes.json(),
    slidersRes.json(),
  ])

  return { props: { personFeatures, sliders } }
}
export default Home
