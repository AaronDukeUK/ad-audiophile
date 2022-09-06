import { useQuery, gql } from "@apollo/client"

import "./Info.scss"

export default function Info() {
  const INFO = gql`
    query {
      siteData {
        data {
          attributes {
            InfoText
            InfoTitle
            InfoImage {
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
  const { data: strapi, loading, error } = useQuery(INFO)
  if (loading) return <p>Loading...</p>
  if (error || strapi.error) return <p>Error!</p>
  return (
    <div className="info">
      <img
        src={`${process.env.REACT_APP_STRAPI_URL}${strapi.siteData.data.attributes.InfoImage.data.attributes.url}`}
        alt="man listening to music"
        className="info__image"
      />
      <h4 className="info__title">
        {strapi.siteData.data.attributes.InfoTitle}
      </h4>
      <p className="info__body">{strapi.siteData.data.attributes.InfoText}</p>
    </div>
  )
}
