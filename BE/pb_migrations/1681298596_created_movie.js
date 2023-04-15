migrate((db) => {
  const collection = new Collection({
    "id": "2vc0p7du52zdqi5",
    "created": "2023-04-12 11:23:16.035Z",
    "updated": "2023-04-12 11:23:16.035Z",
    "name": "movie",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "plofauuj",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fpc1kuig",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2vc0p7du52zdqi5");

  return dao.deleteCollection(collection);
})
