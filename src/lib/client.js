import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
  projectId: "v60hf440",
  dataset: "production",
  apiVersion: "2021-08-31",
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
