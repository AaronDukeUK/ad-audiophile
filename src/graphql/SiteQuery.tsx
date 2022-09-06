import { gql } from "@apollo/client"

export const SITEQUERY = gql`
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

          HeroOverline
          HeroTitle
          HeroText
          HeroProductName
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

          InfoTitle
          InfoText
          InfoImage {
            data {
              attributes {
                url
                name
              }
            }
          }

          FooterText
          CopyText
        }
      }
    }
  }
`
