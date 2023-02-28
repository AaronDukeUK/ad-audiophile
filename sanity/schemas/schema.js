// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// We import object and document schemas
import category from "./category"
import product from "./product"
import hero from "./hero"
import about from "./about"
import footer from "./footer"
import featured from "./featured"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([product, category, featured, hero, about, footer]),
})
