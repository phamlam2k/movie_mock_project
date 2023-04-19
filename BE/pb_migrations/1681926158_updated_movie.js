migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2vc0p7du52zdqi5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2xwdhkyn",
    "name": "category",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "r1lfc0evgpus02l",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2vc0p7du52zdqi5")

  // remove
  collection.schema.removeField("2xwdhkyn")

  return dao.saveCollection(collection)
})
