# HacktiveNews-Server

## Base URL
http://localhost:3000/

## INSTALL PACKAGE
* axios
* bcryptjs
* cors
* dotenv
* google-auth-library
* jsonwebtoken
* sequelize orm
* pg (database postgres)

## 3rd Party API
* [weatherstack](https://weatherstack.com/)
* [News API](https://newsapi.org/)
* [sendgrid](https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/)

## FRONT END LIBRARY
* Bootstrap
* toastify
* fontawesome

## End Points
* POST /register
* POST /login
* POST /newscollection
* GET /newscollection
* DELETE /newscollection/:id
* GET /apis/news/sport
* GET /apis/weather/jakarta
* GET /apis/weather/bandung


## Register Users
Registrasi User
* URL
```url
/register
```
* Method:
```method
POST
```
* URL Params
```params
None
```
* Data
    ```data
    Required:
    {
        "email": req.body.email,
        "password": req.body.password
    }
    ```
* Success Response:
    Code: 201
    ```res
    Content:
    {
        "success": true,
        "message": "User berhasil register"
    }
    ```
* Error Response:
    Code : 400
    ```err
    Content:
    {
        "success": false,
        "errorMessage": [
            "Validation error: Email tidak boleh kosong,",
            "Validation error: Format harus email. example: abc@gmail.com,"
        ]
    }
    ```
    - OR
    Code: 500
    ```or
    Content:
    {
        "success": false,
        "errorMessage": "Internal Server Error"
    }
    ```



## Login Users
Login users
* URL
```url
/login
```
* Method:
```method
POST
```
* URL Params
```params
None
```
* Data
    Required:
    ```data
    {
        email: req.body.email,
        password: req.body.password
    }
    ```
* Success Response:
    Code: 200
    ```res
    Content:
    {
        "success": true,
        "access_token": "<access token>"
    }
    ```
* Error Response:
    Code : 400
    ```err
    Content:
    {
        "success": false,
        "errorMessage": [
            "Validation error: Email tidak boleh kosong,",
            "Validation error: Format harus email. example: abc@gmail.com,"
        ]
    }
    ```
    - OR
    Code: 500
    ```or
    Content:
    {
        "success": false,
        "errorMessage": "Internal Server Error"
    }
    ```


## ADD News
Menambahkan data News
* URL
```url
/newscollection
```
* Method:
```url
POST
```
* Request Headers
```headers
access_token : <access token>
```
* URL Params
```params
None
```
* Data Params
    Required:
    ```data
    {
        "title": req.body.title,
        "url": req.body.url,
        "UserId": req.userId
    }
    ```
* Success Response:
    Code: 201
    ```response
    Content:
    {
        "success": true,
        "data": {
            "id": 1,
            "title": "<news title>",
            "url": "<url title>",
            "UserI"d: req.userId,
            "updatedAt": "2021-04-17T10:31:57.095Z",
            "createdAt": "2021-04-17T10:31:57.095Z"
        }
    }
    ```
* Error Response:
    Code : 400
    ```errResponse
    Content:
    {
        "success": false,
        "errorMessage": [
            "Validation error: Title tidak boleh kosong"
        ]
    }
    ```
    OR
    Code: 500
    ```or
    Content:
    {
        "success": false,
        "errorMessage": "Internal Server Error"
    }
    ```



## Get News
Menampilkan data News
* URL
```url
/newscollection
```
* Method:
```method
GET
```
* Request Headers
```headers
access_token : <access token>
```
* URL Params
```params
None
```
* Data Params
```data
None
```
* Success Response:
    Code: 200
    ```response
    Content:
    {
        "success": true,
        "data": [   
            {
               "id": 1,
                "title": "<news title>",
                "url": "<news url>",
                "createdAt": "2021-04-17T10:10:34.365Z",
                "updatedAt": "2021-04-17T10:10:34.365Z"
            },
            {
                id": 2,
                "title": "<news title>",
                "url": "<news url>",
                "createdAt": "2021-04-17T10:10:34.365Z",
                "updatedAt": "2021-04-17T10:10:34.365Z"
            },
        ]
    }
    ```
* Error Response:
    Code: 500
    ```err
    Content
    {
        "success": false,
        "errorMessage": "Internal Server Error"
    }
    ```



# Delete News
Menghapus data News
* URL
```url
/newscollection/:id
```
* Method:
```delete
DELETE
```
* Request Headers
```headers
access_token : <access token>
```
* URL Params
```params
id
```
* Data Params
```data
None
```
* Success Response:
    Code: 200
    ```or
    Content:
    {message:"News Success Delete"}
    ```
    - OR
    Code: 404
    ```err
    Content
    {
        "success": false,
        "errorMessage": "Data tidak ditemukan"
    }
    ```
* Error Response:
    Code: 500
    ```err
    Content:
    {
        "success": false,
        "errorMessage": "Internal Server Error"
    }
    ```



## 3rd API news sport
mengambil data new sport
* URL
```url
/news
```
* Method:
```method
GET
```
* URL Params
```params
https://newsapi.org/v2/top-headlines?country=id&category=sport&apiKey=<dirahasiakan>
```
* Data Params
```data
None
 ```
* Success Response:
    Code: 200
    ```res
    Content:
    {
        "success": true,
        "data": {
                    "status": "ok",
                    "totalResults": 70,
                    "articles": [
                                    {
                                        "source": {
                                                    "id": null,
                                                    "name": "<media>"
                                        },
                                        "author": "Astini Mega Sari",
                                        "title": "<title>",
                                        "description": "<description>",
                                        "url": "<url>",
                                        "urlToImage": "<url>",
                                        "publishedAt": "<tanggal>",
                                        "content": "<contetn>"
                                    },
    }
    ```
* Error Response:
    Code: 500
    ```or
    Content:
    {
        "success": false,
        "errorMessage": "Internal Server Error"
    }
    ``` 




## 3rd API Weatherstack Jakarta & Bandung
mengambil Weatherstack
* URL
```url
/news
```
* Method:
```method
GET
```
* URL Params
```params
http://api.weatherstack.com/current?query=${kota}&access_key=${process.env.WEATHERSTACK_API_KEY}
```
* Data Params
```data
None
 ```
* Success Response:
    Code: 200
    ```res
    Content:
    {"
        request":{
            "type":"City",
            "query":"Jakarta, Indonesia",
            "language":"en",
            "unit":"m"
        },
        "location":{
            "name":"Jakarta",
        },
        "suhu":60,\
    ```
* Error Response:
    Code: 500
    ```or
    Content:
    {
        "success": false,
        "errorMessage": "Internal Server Error"
    }
    ``` 


## Dokumentasi Ajax
Register
* method:
```
POST
```
* url:
```
http://localhost:3000/register
```
* Data
```
    {
        email: <email>,
        password: <password>
    }
```


Login
* method:
```
POST
```
* url:
```
http://localhost:3000/login
```
* Data
```
    {
        email: <email>,
        password: <password>
    }
```


Login Google
* method:
```
POST
```
* url:
```
http://localhost:3000/googleLogin
```
* Data
```
    {
        token: <id_token>
    }
```



List New
* method:
```
GET
```
* url:
```
http://localhost:3000/newscollection
```
* Headers
```
    access_token: <access_token>
```


Add news
* method:
```
POST
```
* url:
```
http://localhost:3000/newscollection
```
* Data
```
    {
        title,
        url,
        userId
    }
```
* Headers
```
    access_token: <access_token>
```


Delete News
* method:
```
DELETE
```
* url:
```
http://localhost:3000/newscollection/:id
```
* Data
```
none
```
* Headers
```
    access_token: <access_token>
```


3RD API News
* method:
```
GET
```
* url:
```
http://localhost:3000/apis/news/sport
```
* Data
```
none
```


3RD API weathers jakarta & bandung
* method:
```
GET
```
* url:
```
http://localhost:3000/apis/weather/jakarta 
- OR
http://localhost:3000/apis/weather/bandung
```
* Data
```
none
```