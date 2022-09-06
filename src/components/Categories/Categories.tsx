import { Link } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"

import ArrowRight from "../ArrowRight/ArrowRight"
import "./Categories.scss"
import { useShoppingCart } from "../../context/ShoppingCartContext"

export default function Categories() {
  const CATEGORIES = gql`
    query {
      categories {
        data {
          id
          attributes {
            name
            categoryImage {
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
  const { data: strapi, loading, error } = useQuery(CATEGORIES)

  const { closeMobileMenu } = useShoppingCart()

  if (loading) return <p>Loading...</p>
  if (error || strapi.error) return <p>Error!</p>

  return (
    <div className="categories">
      {strapi.categories.data.map((category: any) => (
        <div key={category.id} className="categories__section">
          <img
            className="categories__image"
            src={`${process.env.REACT_APP_STRAPI_URL}${category.attributes.categoryImage.data.attributes.url}`}
            alt={category.attributes.name}
          />
          <div className="categories__blur"></div>
          <p className="categories__title">{category.attributes.name}</p>
          <Link
            to={`/categories/${category.attributes.name}`}
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
