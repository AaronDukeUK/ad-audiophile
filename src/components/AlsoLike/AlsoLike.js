import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { client, urlFor } from "../../lib/client"

import "./AlsoLike.scss"

const AlsoLike = ({ productId }) => {
  const [alsoLike, setAlsoLike] = useState(null)
  const AlsoLikeQuery = `
  *[_type == "product" && _id != "${productId}"][0..2]{ 
      _id,
      slug,
      title,
      main_image{
        asset->{
          _id,
          url
        },
      },  
    } 
`

  useEffect(() => {
    setAlsoLike(null)

    client
      .fetch(AlsoLikeQuery)
      .then((data) => setAlsoLike(data))
      .catch(console.error)
  }, [AlsoLikeQuery])

  if (alsoLike) {
    return (
      <div className="alsolike">
        <h5 className="alsolike__title">YOU MAY ALSO LIKE</h5>
        {alsoLike.map((product) => (
          <div key={product._id} className="alsolike__product">
            <div className="alsolike__image-container">
              <img
                className="alsolike__image"
                src={urlFor(product.main_image.asset.url)}
                alt={product.title}
              />
            </div>
            <h5>{product.title}</h5>
            <Link
              className="button button--orange"
              to={`/products/${product.slug.current}`}
            >
              SEE PRODUCT
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default AlsoLike
