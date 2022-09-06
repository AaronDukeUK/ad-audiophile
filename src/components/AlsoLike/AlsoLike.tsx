import { useQuery, gql } from "@apollo/client"

import { Link } from "react-router-dom"

import "./AlsoLike.scss"

const AlsoLike = (props: any) => {
  const PRODUCTS = gql`
    query {
      products(
        filters: {
          category: { eq: "${props.category}" }
          titleLineOne: { ne: "${props.title}" }
        }
      ) {
        data {
          id
          attributes {
            titleLineOne
            smallImage {
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

  const { data: strapi, loading, error } = useQuery(PRODUCTS)
  if (loading) return <p>Loading...</p>
  if (error || strapi.error) return <p>Error!</p>

  return (
    <div className="alsolike">
      <h5 className="alsolike__title">YOU MAY ALSO LIKE</h5>

      {strapi.products.data.map((product: any) => (
        <div key={product.id} className="alsolike__product">
          <div className="alsolike__image-container">
            <img
              className="alsolike__image"
              src={`${process.env.REACT_APP_STRAPI_URL}${product.attributes.smallImage.data.attributes.url}`}
              alt={product.attributes.titleLineOne}
            />
          </div>
          <h5>{product.attributes.titleLineOne}</h5>
          <Link
            className="button button--orange"
            to={`/products/${product.id}`}
          >
            SEE PRODUCT
          </Link>
        </div>
      ))}
    </div>
  )
}

export default AlsoLike
