import { Link } from "react-router-dom"

import { useSite } from "../../context/SiteContext"

import "./Hero.scss"

const Hero = () => {
  const { hero } = useSite()
  if (hero) {
    return (
      <div className="hero">
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
