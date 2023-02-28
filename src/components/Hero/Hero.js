import { Link } from "react-router-dom"
import { urlFor } from "../../lib/client"

import { useSite } from "../../context/SiteContext"

import "./Hero.scss"

const Hero = () => {
  const { hero } = useSite()
  if (hero) {
    const heroBg = {
      backgroundImage: `url(${urlFor(hero[0].image.asset.url)})`,
    }
    return (
      <div className="hero" style={heroBg}>
        <small className="hero__overline">{hero[0].above}</small>
        <h2 className="hero__title">{hero[0].title}</h2>
        <p className="hero__body">{hero[0].text}</p>
        <Link to="/products/1" className="button button--orange">
          SEE PRODUCT
        </Link>
      </div>
    )
  }
}

export default Hero