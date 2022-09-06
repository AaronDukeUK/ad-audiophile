import Hero from "../../components/Hero/Hero"
import { Categories, FeaturedProducts, Info } from "../../components"
import "./Home.scss"

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Info />
    </div>
  )
}
