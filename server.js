require("./mongoConfig") //take mongoose info from config file

const express = require('express'); //import express
const routes = require('./routes/msg'); //import the routes
const helmet = require('helmet'); //import helmet
const compression = require('compression'); //import compression
const morgan = require('morgan') //import morgan

const app = express();

app.use(helmet()); //add json security
app.use(compression()); //compress all routes
app.use(express.json()); //parses incoming requests with JSON payloads
app.use(morgan('combined')) //prints logging when requests are made

app.use('/', routes); //to use the routes

//Index page (static HTML)
app.route("/")
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

//listens to port 3000 (or whichever port heroku chooses)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port)
})

module.exports = app;