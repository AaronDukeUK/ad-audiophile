import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import ReactMarkdown from "react-markdown"
import { useState } from "react"

import { Categories, Info } from "../../components"

import "./Product.scss"
import AlsoLike from "../../components/AlsoLike/AlsoLike"
import { useShoppingCart } from "../../context/ShoppingCartContext"

export default function Product() {
  const navigate = useNavigate()
  const { product } = useParams()
  const [quantity, setQuantity] = useState(1)

  const { addToCart, openCart } = useShoppingCart()

  const PRODUCT = gql`
    query {
      product(id: ${product}) {
        data {
          id
          attributes {
            category
            titleLineOne
            titleLineTwo
            shortDescription
            longDescription
            featured
            price
            inStock
            inTheBox
            mainImage {
              data {
                id
                attributes {
                  url
                  name
                }
              }
            }
            extraImages {
              data {
                id
                attributes {
                  url
                  name
                }
              }
            }
          }
        }
      }
    }
  `

  const { data: strapi, loading, error } = useQuery(PRODUCT)
  if (loading) return <p>Loading...</p>
  if (error || strapi.error) return <p>Error!</p>

  const {
    titleLineOne,
    titleLineTwo,
    shortDescription,
    longDescription,
    price,
    featured,
    mainImage,
    extraImages,
    inStock,
    inTheBox,
    category,
  } = strapi.product.data.attributes

  const handleAddToCart = () => {
    addToCart(strapi.product.data, quantity)
    setQuantity(1)
    openCart()
  }

  const handleDecrease = () => {
    if (quantity === 1) {
      return
    }
    setQuantity(quantity - 1)
  }

  return (
    <>
      <div className="product">
        <p className="product__goback" onClick={() => navigate(-1)}>
          Go Back
        </p>
        <img
          src={`${process.env.REACT_APP_STRAPI_URL}${mainImage.data.attributes.url}`}
          alt=""
          className="product__image"
        />
        {featured && <small className="product__overline">NEW PRODUCT</small>}
        <h4 className="product__title">
          {titleLineOne}
          <br />
          {titleLineTwo}
        </h4>
        <ReactMarkdown className="product__body">
          {shortDescription}
        </ReactMarkdown>
        <h6 className="product__price">£{price}</h6>
        {inStock ? (
          <div className="product__addToCartContainer">
            <div className="product__quantityContainer">
              <button onClick={() => setQuantity(quantity + 1)}>
                <p>+</p>
              </button>
              <p className="product__quantity">{quantity}</p>
              <button onClick={handleDecrease}>
                <p>-</p>
              </button>
            </div>

            <button className="button button--orange" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        ) : (
          <button className="button button--outline" disabled>
            OUT OF STOCK
          </button>
        )}
        <h5>FEATURES</h5>
        <ReactMarkdown className="product__features">
          {longDescription}
        </ReactMarkdown>
        <h5>IN THE BOX</h5>
        <ReactMarkdown className="product__in-the-box">
          {inTheBox}
        </ReactMarkdown>
        {extraImages && (
          <div className="product__extra-images">
            {extraImages.data.map((image: any) => (
              <img
                className="product__extra-image"
                key={image.attributes.name}
                src={`${process.env.REACT_APP_STRAPI_URL}${image.attributes.url}`}
                alt={image.attributes.name}
              />
            ))}
          </div>
        )}
      </div>
      <AlsoLike category={category} title={titleLineOne} />
      <Categories />
      <div className="product__spacer"></div>
      <Info />
    </>
  )
}
