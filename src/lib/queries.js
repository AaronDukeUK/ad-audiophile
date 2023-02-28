export const siteQuery = `
{
  'hero': *[_type == "hero"]{
    above,
    title,
    text,
    image{
      asset->{
        _id,
        url
      },
    },
  },

  'info': *[_type == "about"]{
    _id,
    title,
    text,
    image{
      asset->{
        _id,
        url
      },
    },
  },

  'featured': *[_type == "featured"]{
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
  },

  'footer': *[_type == "footer"]{
    text,
    copy,
  },
  
  'category': *[_type == "category"]{
    _id,
    title,
    slug,
    image{
      asset->{
        _id,
        url
      },
    },
  }
}
`
