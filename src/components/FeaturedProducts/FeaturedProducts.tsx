import { Link } from "react-router-dom"

import "./FeaturedProducts.scss"

export default function FeaturedProducts() {
  return (
    <div className="featured">
      <div className="featured__item featured__item--main">
        <img
          className="featured__image"
          src={require("../../assets/featured/featured-speaker.png")}
          alt="speaker featured image"
        />
        <h4 className="featured__title featured__title--white">ZX9</h4>
        <h4 className="featured__title featured__title--white">SPEAKER</h4>
        <p className="featured__body featured__body--white">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Link className="button button--black" to="/">
          SEE PRODUCT
        </Link>
      </div>

      <div className="featured__item featured__item--speaker">
        <h4 className="featured__title">ZX7 SPEAKER</h4>
        <Link className="button button--outline" to="/">
          SEE PRODUCT
        </Link>
      </div>

      <div className="featured__item featured__item--image"></div>

      <div className="featured__item featured__item--text">
        <h4 className="featured__title">YX1 EARPHONES</h4>
        <Link className="button button--outline" to="/">
          SEE PRODUCT
        </Link>
      </div>
    </div>
  )
}
