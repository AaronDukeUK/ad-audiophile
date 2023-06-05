import { Link } from "react-router-dom"

import { useSite } from "../../context/SiteContext"

import "./Hero.scss"

const Hero = () => {
  const { hero } = useSite()
  if (hero) {
    return (
      <div className="hero">
        <div className="hero__container">
          <small className="hero__overline">{hero[0].above}</small>
          <h1 className="hero__title">{hero[0].title}</h1>
          <p className="hero__body">{hero[0].text}</p>
          <Link
            to="/products/xx99-mark-ii-headphones"
            className="button button--orange"
          >
            SEE PRODUCT
          </Link>
        </div>
      </div>
    )
  }
}

export default Hero
