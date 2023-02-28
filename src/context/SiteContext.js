import { createContext, useContext, useEffect, useState } from "react"

import { client } from "../lib/client"

import { siteQuery } from "../lib/queries"

const SiteContext = createContext({})

export function useSite() {
  return useContext(SiteContext)
}

export function SiteProvider({ children }) {
  const [hero, setHero] = useState(null)
  const [categories, setCategories] = useState(null)
  const [info, setInfo] = useState(null)
  const [featured, setFeatured] = useState(null)
  const [footer, setFooter] = useState(null)

  const [loading, setLoading] = useState(true)

  const loader = document.querySelector(".loader")

  useEffect(() => {
    console.log(loading)
    if (loading) {
      loader.classList.add("loader--active")
    }
    if (!loading) {
      setTimeout(() => {
        loader.classList.remove("loader--active")
      }, 10)
    }
  }, [loading])

  // fetching the data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await client.fetch(siteQuery)
      if (data) {
        setHero(data.hero)
        setCategories(data.category)
        setInfo(data.info)
        setFeatured(data.featured)
        setFooter(data.footer)
      }
    }

    fetchData().then(setLoading(false)).catch(console.error)
  }, [siteQuery])

  return (
    <SiteContext.Provider
      value={{
        hero,
        categories,
        info,
        featured,
        footer,
        loading,
        setLoading,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}
