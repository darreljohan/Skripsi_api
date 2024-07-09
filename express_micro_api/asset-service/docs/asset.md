# Asset API

## Add new asset

Add new asset record to the database and return the have recorded asset as response

Endpoint: POST /api/assets

Request Body:

```json
{
  "asset": {
    "name": "string",
    "date_owned": "string", //optional
    "price_owned": "integer", //optional
    "location": "string" //optional
  },
  "categories": [
    {
      "id": "integer"
    }
  ], //optional
  "pictures": [
    {
      "id": "integer"
    }
  ] //optional
}
```

Response Body (Success):

```json
{
  "data": {
    "categories": [],
    "date_owned": null,
    "id": 391,
    "location": null,
    "name": "test_asset",
    "pictures": [],
    "price_owned": null
  }
}
```

Response Body (Failed):

```json
{
  "error": "message"
}
```

## Get Asset by ID

Endpoint: GET /api/asset/<mark>:idAsset</mark>

Response Body:

```json
{
  "error": "message"
}
```

## Update Asset information (Include Category)

Replace asset record based on request data

Endpoint: PATCH /api/asset

Request Body:

```json
{
  "asset": {
    "id": "number",
    "name": "string", //optional
    "date_owned": "string", //optional
    "price_owned": "integer", //optional
    "location": "string" //optional
  },
  "categories": [
    {
      "id": "integer"
    }
  ] //optional
}
```

## Remove Asset Information

Deleting asset record based on asset id

Endpoint: DELETE /api/asset/:AssetID

## Search Asset by filter

Return asset record according to criteria

Endpoint: GET /api/search

Request Body:

```json
{
  "name": "string", //optional - Search for asset record which contains given value in asset name
  "date_owned_lower": "Date", //optional - Search for asset record with date greater than equals given value
  "date_owned_upper": "Date", //optional - Search for asset record with date lower than equals given value
  "price_owned_lower": "number", //optional - Search for asset record with price greater than equals given value
  "price_owned_upper": "number", //optional - Search for asset record with price lower than equals given value
  "categories?": "number[]", //optional - Search for asset record which contains given categories id
  "page": "number", //optional - Define which page should be retrieve -default value is 1
  "size": "number" //optional - Define how big size per page - default value is 10
};
```

Response Body (Success):

```json
{
  "data": [
    {
      "asset": {
        "id": "number",
        "name": "string",
        "date_owned": "string",
        "price_owned": "integer",
        "location": "string"
      },
      "categories": [
        {
          "id": "integer"
        }
      ]
    }
  ],
  "paging": {
    "currentPage": 0,
    "size": 10,
    "totalPage": 2
  }
}
```
