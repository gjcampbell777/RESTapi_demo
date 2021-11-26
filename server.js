require("./mongoConfig")

const express = require('express');
const routes = require('./routes/msg'); //import the routes
const helmet = require('helmet'); 
const compression = require('compression'); 
const morgan = require('morgan')

const app = express();

app.use(helmet());
app.use(compression()); //compress all routes
app.use(express.json()); //parses incoming requests with JSON payloads
app.use(morgan('combined')) //prints logging when requests are made

app.use('/', routes); //to use the routes

//Index page (static HTML)
app.route("/")
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port)
})

module.exports = app;