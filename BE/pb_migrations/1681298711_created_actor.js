migrate((db) => {
  const collection = new Collection({
    "id": "cbj9thwpanvuxa5",
    "created": "2023-04-12 11:25:11.255Z",
    "updated": "2023-04-12 11:25:11.255Z",
    "name": "actor",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jtlton4x",
        "name": "name",
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
  const collection = dao.findCollectionByNameOrId("cbj9thwpanvuxa5");

  return dao.deleteCollection(collection);
})
