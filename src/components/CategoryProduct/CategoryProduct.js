import { Link } from "react-router-dom"

import "./CategoryProduct.scss"

import { urlFor } from "../../lib/client"

const CategoryProduct = ({ product }) => {
  if (product) {
    return (
      <div className="category-product">
        <div className="category-product__image-wrapper">
          <img
            className="category-product__image"
            src={urlFor(product.main_image.asset.url)}
            alt={product.title}
          />
        </div>
        <div className="category-product__text-wrapper">
          {product.new_product && (
            <small className="category-product__overline">NEW PRODUCT</small>
          )}
          <h2 className="category-product__title">{product.title}</h2>
          <p className="category-product__body">{product.info}</p>
          <Link
            className="button button--orange"
            to={`/products/${product.slug.current}`}
          >
            SEE PRODUCT
          </Link>
        </div>
      </div>
    )
  }
}

export default CategoryProduct
