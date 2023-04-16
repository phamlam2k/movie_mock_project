migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2vc0p7du52zdqi5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nzxbishv",
    "name": "actor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "cbj9thwpanvuxa5",
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
  collection.schema.removeField("nzxbishv")

  return dao.saveCollection(collection)
})
