import S from "@sanity/desk-tool/structure-builder"

export default () =>
  S.list()
    .title("audiophile.co.uk/admin")
    .items([
      S.listItem()
        .title("Site")
        .child(
          S.list()
            // Sets a title for our new list
            .title("Site Information")
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title("Hero")
                .child(S.document().schemaType("hero").documentId("hero")),
              S.listItem()
                .title("About")
                .child(S.document().schemaType("about").documentId("about")),
              S.listItem()
                .title("Footer")
                .child(S.document().schemaType("footer").documentId("footer")),
            ])
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(
        (listItem) => !["hero", "about", "footer"].includes(listItem.getId())
      ),
    ])
