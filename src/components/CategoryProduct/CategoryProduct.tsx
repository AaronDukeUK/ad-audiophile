import { Link } from "react-router-dom"

import "./CategoryProduct.scss"

interface IProps {
  id: string
  attributes: {
    titleLineOne: string
    titleLineTwo: string
    featured: boolean
    shortDescription: string
    mainImage: any
  }
}

const CategoryProduct: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="category-product">
      <img
        className="category-product__image"
        src={`${process.env.REACT_APP_STRAPI_URL}${props.attributes.mainImage.data.attributes.url}`}
        alt={props.attributes.titleLineOne}
      />

      {props.attributes.featured && (
        <small className="category-product__overline">NEW PRODUCT</small>
      )}
      <h4 className="category-product__title">
        {props.attributes.titleLineOne}
      </h4>
      <h4 className="category-product__title">
        {props.attributes.titleLineTwo}
      </h4>
      <p className="category-product__body">
        {props.attributes.shortDescription}
      </p>
      <Link className="button button--orange" to={`/products/${props.id}`}>
        SEE PRODUCT
      </Link>
    </div>
  )
}

export default CategoryProduct
