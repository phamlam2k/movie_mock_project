migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cbj9thwpanvuxa5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vue3uakf",
    "name": "avatar",
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
  const collection = dao.findCollectionByNameOrId("cbj9thwpanvuxa5")

  // remove
  collection.schema.removeField("vue3uakf")

  return dao.saveCollection(collection)
})
