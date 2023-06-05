import { Link } from "react-router-dom"
import { urlFor } from "../../lib/client"

import ArrowRight from "../ArrowRight/ArrowRight"
import "./Categories.scss"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { useSite } from "../../context/SiteContext"

const Categories = () => {
  const { closeMobileMenu } = useShoppingCart()
  const { categories } = useSite()
  if (categories) {
    return (
      <div className="categories">
        {categories.map((category) => (
          <div key={category._id} className="categories__section">
            <img
              className="categories__image"
              src={`${urlFor(category.image.asset.url)}?format=auto`}
              alt={category.title}
            />
            <div className="categories__blur"></div>
            <p className="categories__title">{category.title}</p>
            <Link
              to={`/categories/${category.slug.current}`}
              className="categories__button"
              onClick={closeMobileMenu}
            >
              SHOP
              <ArrowRight />
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default Categories
