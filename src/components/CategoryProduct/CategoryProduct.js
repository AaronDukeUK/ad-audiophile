import { Link } from "react-router-dom"

import "./CategoryProduct.scss"

import { urlFor } from "../../lib/client"

const CategoryProduct = ({ product }) => {
  if (product) {
    return (
      <div className="category-product">
        <img
          className="category-product__image"
          src={urlFor(product.image.asset.url)}
          alt={""}
        />

        {product && (
          <small className="category-product__overline">NEW PRODUCT</small>
        )}
        <h4 className="category-product__title">{product.title}</h4>
        <p className="category-product__body">{product.info}</p>
        <Link
          className="button button--orange"
          to={`/products/${product.slug.current}`}
        >
          SEE PRODUCT
        </Link>
      </div>
    )
  }
}

export default CategoryProduct
