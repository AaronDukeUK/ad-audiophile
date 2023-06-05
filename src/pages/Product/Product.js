import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { client, urlFor } from "../../lib/client"

import { Categories, Info } from "../../components"

import "./Product.scss"
import AlsoLike from "../../components/AlsoLike/AlsoLike"

import { useShoppingCart } from "../../context/ShoppingCartContext"
import { useSite } from "../../context/SiteContext"

export default function Product() {
  const { setLoading } = useSite()

  const navigate = useNavigate()
  const { product: productRef } = useParams()
  const [quantity, setQuantity] = useState(1)

  const { addToCart, openCart } = useShoppingCart()

  const [product, setProduct] = useState(null)

  const ProductQuery = `
  *[_type == "product" && slug.current == "${productRef}"]{
    
      stripe_id,
      in_stock,
      new_product,
      title,
      info,
      features,
      in_the_Box,
      price,
      main_image{
        asset->{
          _id,
          url
        },
      },
      gallery_images[]{
        asset->{
          _id,
          url
        },
      },
    }
  `

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const data = await client.fetch(ProductQuery)
      setProduct(data[0])
      setLoading(false)
    }
    fetchData().catch(console.error)
  }, [ProductQuery, setLoading])

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.stripe_id,
        title: product.title,
        price: product.price,
        imageUrl: product.main_image.asset.url,
      },
      quantity
    )
    console.log(product)
    setQuantity(1)
    openCart()
  }

  const handleDecrease = () => {
    if (quantity === 1) {
      return
    }
    setQuantity(quantity - 1)
  }

  if (product) {
    return (
      <>
        <div className="product">
          <p className="product__goback" onClick={() => navigate(-1)}>
            Go Back
          </p>
          <div className="product__top-wrapper">
            <div className="product__image-wrapper">
              <img
                src={urlFor(product.main_image.asset.url)}
                alt=""
                className="product__image"
              />
            </div>
            <div className="product__info">
              {product.new_product && (
                <small className="product__overline">NEW PRODUCT</small>
              )}
              <h2 className="product__title">{product.title}</h2>
              <p className="product__body">{product.info}</p>
              <h6 className="product__price">£{product.price}</h6>
              {product.in_stock ? (
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

                  <button
                    className="button button--orange"
                    onClick={handleAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              ) : (
                <button className="button button--outline" disabled>
                  OUT OF STOCK
                </button>
              )}
            </div>
          </div>
          <div className="product__middle-wrapper">
            <div className="product__features">
              <h5>FEATURES</h5>
              <p className="product__features">{product.features}</p>
            </div>
            <div className="product__in-the-box">
              <h5>IN THE BOX</h5>
              <p>
                <span>1x</span> Headphone Unit
              </p>
              <p>
                <span>2x</span> Replacement Earcups
              </p>
              <p>
                <span>1x</span> User Manual
              </p>
              <p>
                <span>1x</span> 3.5mm Audio Cable
              </p>
              <p>
                <span>1x</span> Travel Bag
              </p>
            </div>
          </div>
          {product.gallery_images && (
            <div className="product__extra-images">
              {product.gallery_images.map((image) => (
                <img
                  className="product__extra-image"
                  key={image.asset._id}
                  src={urlFor(image.asset.url)}
                  alt={image.asset._id}
                />
              ))}
            </div>
          )}
        </div>
        <AlsoLike productId={product._id} />
        <Categories />
        <div className="product__spacer"></div>
        <Info />
      </>
    )
  }
}
