import { Link } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import { useLayoutEffect } from "react"

import "./Hero.scss"

export default function Hero() {
  const HERO = gql`
    query {
      siteData {
        data {
          attributes {
            HeroText
            HeroOverline
            HeroProductName
            HeroTitle
            HeroMobileImage {
              data {
                attributes {
                  url
                  name
                }
              }
            }
            HeroDesktopImage {
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
  const { data: strapi, loading, error } = useQuery(HERO)

  useLayoutEffect(() => {
    if (!loading || error) {
      const hero = document.querySelector(".hero") as HTMLDivElement
      const checkSize = (vw: number) => {
        if (vw < 1000) {
          hero.style.backgroundImage = `url("${process.env.REACT_APP_STRAPI_URL}${HeroMobileImage.data.attributes.url}")`
        }
        if (vw >= 1000) {
          hero.style.backgroundImage = `url("${process.env.REACT_APP_STRAPI_URL}${HeroDesktopImage.data.attributes.url}")`
        }
      }
      let vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
      checkSize(vw)
      window.addEventListener("resize", () => {
        vw = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
        checkSize(vw)
      })
    }
  }, [loading])

  if (loading) return <p>Loading...</p>
  if (error || strapi.error) return <p>Error!</p>

  const {
    HeroText,
    HeroOverline,
    HeroTitle,
    HeroMobileImage,
    HeroDesktopImage,
  } = strapi.siteData.data.attributes

  return (
    <div className="hero">
      <small className="hero__overline">{HeroOverline}</small>
      <h2 className="hero__title">{HeroTitle}</h2>
      <p className="hero__body">{HeroText}</p>
      <Link to="/products/1" className="button button--orange">
        SEE PRODUCT
      </Link>
    </div>
  )
}
