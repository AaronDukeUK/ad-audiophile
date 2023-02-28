export default {
  name: "featured",
  title: "Featured",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "info",
      title: "Info",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
  ],
}
