migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2vc0p7du52zdqi5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "umfaxxvj",
    "name": "poster",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2vc0p7du52zdqi5")

  // remove
  collection.schema.removeField("umfaxxvj")

  return dao.saveCollection(collection)
})
