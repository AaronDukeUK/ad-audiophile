export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "in_stock",
      title: "In Stock",
      type: "boolean",
    },
    {
      name: "new_product",
      title: "New Product",
      type: "boolean",
    },
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
      name: "features",
      title: "Features",
      type: "text",
    },
    {
      name: "in_the_Box",
      title: "In The Box",
      type: "text",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "gallery_images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
    },
  ],
}
