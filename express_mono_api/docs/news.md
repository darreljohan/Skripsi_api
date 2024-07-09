# News API

## Upload News

Upload news object into database

Endpoint: POST /api/news

Request Body:

```json
{
  "title": "string",
  "description": "string",
  "tags": {
    "id": "number"
  }
}
```

Response Body:

```json
{
  "data": {
    "news": {
      "id": "number",
      "title": "string",
      "description": "string",
      "upload_date": "datetime",
      "document_link": "string",
      "author": "string"
    },
    "tags": []{
        "id": "number",
        "tag_name": "string"
      },
  }

}
```

## Search News

Retrieve news from the database, ordered from the latest date

Endpoint: GET /api/news

Request Body:

```json
{
  "title": "string", //optional - Search for asset record which contains given value in asset name
  "upload_date_lower": "Date", //optional - Search for asset record with date greater than equals given value
  "upload_date_upper": "Date", //optional - Search for asset record with date lower than equals given value
  "tags": "number[]", //optional - Search for asset record which contains given categories id
  "page": "number", //optional - Define which page should be retrieve
  "size": "number" //optional - Degine how big size per page
};
```

Response Body:

```json
{
    "data":[]{
        "news": {
            "id": "number",
            "title": "string",
            "description": "string",
            "upload_date": "datetime",
            "document_link": "string",
            "author": "string"
        },
        "tags": {
            "id": "number",
            "tag_name": "string"
        },
    },
    "paging": {
        "currentPage": "number",
        "size": "number",
        "totalPage": "number"
    }
}
```

## Delete News

Delete news based on ID

Endpoint: DELETE /api/news/:id

Response Body:

```json
{
  "data": {
    "news": {
      "id": "number",
      "title": "string",
      "description": "string",
      "tags": {
        "id": "number",
        "tag_name": "string"
      },
      "upload_date": "datetime",
      "document_link": "string",
      "author": "string"
    }
  }
}
```
