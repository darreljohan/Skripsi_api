# File API

## Upload asset picture

Upload picture of an asset

Endpoint: POST /api/file

Request Multipart/formdata :

```json
{
  "id": "Number",
  "file": "BLOB"
}
```

Response Body :

```json
{
  "data": {
    "id": "number",
    "pictures": {
      "id": "number",
      "url": "string"
    }
  }
}
```

## Preview picture

Fetch picture from the given filename

Endpoint : GET /api/file/:filename

Response : File

## Delete asset picture

Deleting picture from server and disconnect from asset record based on asset id and picture id

Endpoint : DELETE /api/file

Request Body :

```json
{
  "id": "number",
  "picture": {
    "id": "number",
  }
}
```
