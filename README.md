# Message API using Express js, Mongoose and Heroku 

## Description

<p>Wrote up a RESTful API using Node.js, Express js for the main logic and implementation.<br>
I connected this app to Heroku for cloud deployment and am using mongoose for the database implementation. <br>
The web app itself can be accessed [here](https://gregs-rest-api-demo.herokuapp.com) and <br> 
you can make curl calls yourself using the URL https://gregs-rest-api-demo.herokuapp.com.</p>

<br>

<p>For the actual API architeture itself I implemented GET, POST, PUT and DELETE calls. <br>
The messages themselves consist of and id, a message and a time stamp for when the message was created.<br>
The id can be used to find a specific message for the GET, PUT and DELETE calls.<br>
The id is always taken from the request parameter whereas the message is taken from the request body.<br>
The message Schema is as follows:<br>
`id: {type:Number, required:true},
message: {type:String, required:true},
time: {type:Date, required:true}`
</p>

## Libraries and tools used
- [Express](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com/)
- [Morgan](https://github.com/expressjs/morgan), [Helmet](https://github.com/helmetjs/helmet)
- [Mocha](https://mochajs.org/#getting-started), [Chai](http://chaijs.com/api/), [Supertest](https://github.com/visionmedia/supertest)

## How to

### Build

<p>Clone this repository and install dependencies</p>

`> git clone git@github.com:gjcampbell777/RESTapi_demo.git
> cd express-rest-api

> npm install`

### Deploy

#### Locally

<p>Fire up the local server</p>

`node server.js`

#### Cloud

<p>If you have your own HEROKU_API_KEY you can run:</p>

`git push heroku`

### Access

#### Locally

<p>The web app can now be reached locally at:</p>

`http://localhost:3000/`

#### Cloud

<p>The web app can be accessed through your heroku URL</p>

## REST API Documentation

### GET

<p>To get info on all messages use</p>

`/msg`

<p>To get info on one message use</p>

`/msg/:id`

<p>The id info is taken from the parameter</p>

### POST

<p>To send a message use</p>

`/msg/:id`

<p>The id info is taken from the parameter, the message info is taken from the body<br>
and the timestamp is taken from the API logic</p>

### PUT

<p>To update a message use</p>

`/msg/:id`

<p>The id info is taken from the parameter and the new message info is taken from the body</p>

### DELETE

<p>To delete all messages use</p>

`/msg`

<p>To delete one message use</p>

`/msg/:id`

<p>The id info is taken from the parameter</p>

## Licence
MIT