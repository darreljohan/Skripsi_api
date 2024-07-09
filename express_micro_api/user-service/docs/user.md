# User API

Dedicated for microservices user service

## Register User

Endpoint : POST /api/users

Request Body:

```json
{
  "username": "string",
  "password": "string",
  "name": "string,
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "test",
    "name": "test"
  }
}
```

Response Body (Failed):

```json
{
  "error": "Error message",
  "message": "Message"
}
```

## Login User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "tester",
  "password": "tester"
}
```

Response Body (success):

```json
{
  "data": {
    "name": "Tester",
    "token": "8c1170f2-5679-439a-ac9a-8130331665cc",
    "username": "test"
  }
}
```

Response Body (failed):

```json
{
  "error": "Error message",
  "message": "Message"
}
```

### Authenticate User Request

Endpoint : GET /api/users/auth

Request Header :

```json
{
  "X-API-TOKEN": "string"
}
```

Response User :

````json
{
  "name":"string",
  "username":"string",
  "password":"string",
  "token":"string"
}
### Get current login user information

Endpoint : POST /api/users/current

Request Body :

```json
{
  "token": "token"
}
````

Response Body (failed):

```json
{
  "error": "Error message",
  "message": "Message"
}
```

### Update User Information

Endpoint : PATCH /api/users/current

Request Body :

```json
{
  "username": "username",
  "password": "password",
  "token": "token"
}
```

Response Body (failed):

```json
{
  "error": "Error message",
  "message": "Message"
}
```

### Delete Current Session

Endpoint : DELETE /api/users/current

Request Body :

```json
{
  "token": "token"
}
```

Response Body (failed):

```json
{
  "error": "Error message",
  "message": "Message"
}
```
