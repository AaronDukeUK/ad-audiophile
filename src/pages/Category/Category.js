import { useParams } from "react-router-dom"

import { Categories, CategoryProduct, Info } from "../../components"
import "./Category.scss"

import { client } from "../../lib/client"
import { useState, useEffect } from "react"

import { useSite } from "../../context/SiteContext"

export default function Category() {
  const { setLoading } = useSite()

  const { category: categoryRef } = useParams()

  const [products, setProducts] = useState(null)

  const categoryProductsQuery = `
  *[_type == "category" && slug.current == "${categoryRef}"]{
    "products": *[_type=='product' && references(^._id)]{ 
      _id,
      title,
      slug,
      info,
      image{
        asset->{
          _id,
          url
        },
      },
    }
  }
`

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const data = await client.fetch(categoryProductsQuery)
      setProducts(data[0].products)
      setLoading(false)
    }
    fetchData().catch(console.error)
  }, [categoryProductsQuery, setLoading])

  if (products) {
    return (
      <div className="category">
        <h1 className="category__title">{categoryRef}</h1>
        <div className="category__items">
          {products === 0 ? (
            <h6 className="category__no-products">
              No products for
              <br />'{categoryRef}'<br />
              have been found
            </h6>
          ) : (
            products.map((product) => (
              <CategoryProduct key={product._id} product={product} />
            ))
          )}
        </div>
        <Categories />
        <Info />
      </div>
    )
  }
}
