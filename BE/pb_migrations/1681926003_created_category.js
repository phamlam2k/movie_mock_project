migrate((db) => {
  const collection = new Collection({
    "id": "r1lfc0evgpus02l",
    "created": "2023-04-19 17:40:03.028Z",
    "updated": "2023-04-19 17:40:03.028Z",
    "name": "category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vxhm3wrr",
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
  const collection = dao.findCollectionByNameOrId("r1lfc0evgpus02l");

  return dao.deleteCollection(collection);
})
