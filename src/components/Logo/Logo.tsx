import "./Logo.scss"
import { useQuery, gql } from "@apollo/client"

export default function Logo() {
  const LOGO = gql`
    query {
      siteData {
        data {
          attributes {
            logo {
              data {
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
  const { data: strapi, loading, error } = useQuery(LOGO)
  if (loading) return <p>Loading...</p>
  if (error || strapi.error) return <p>Error!</p>
  return (
    <img
      src={`${process.env.REACT_APP_STRAPI_URL}${strapi.siteData.data.attributes.logo.data.attributes.url}`}
      alt={strapi.siteData.data.attributes.logo.data.attributes.name}
    />
  )
}
