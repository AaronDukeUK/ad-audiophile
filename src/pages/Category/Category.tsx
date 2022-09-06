import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"

import { Categories, CategoryProduct, Info } from "../../components"
import "./Category.scss"

export default function Category() {
  const { category } = useParams()
  const PRODUCTS = gql`
  query {
    products(filters: { category: { eq: "${category}" } }) {
      data {
        id
        attributes {
          titleLineOne
          titleLineTwo
          shortDescription
          featured
          mainImage {
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
    <div className="category">
      <h1 className="category__title">{category}</h1>
      <div className="category__items">
        {strapi.products.data == 0 ? (
          <h6 className="category__no-products">
            No products for
            <br />'{category}'<br />
            have been found
          </h6>
        ) : (
          strapi.products.data.map((product: any) => (
            <CategoryProduct key={product.id} {...product} />
          ))
        )}
      </div>
      <Categories />
      <Info />
    </div>
  )
}
