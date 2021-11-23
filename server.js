require('dotenv').config({ path: 'development.env' });

const express = require('express');
const routes = require('./routes/msg'); //import the routes
const mongoose = require('mongoose'); //import mongoose
const helemt = require('helmet'); //import helmet
const compression = require('compression'); //import compression

const app = express();
app.use(helmet());
app.use(compression()); //compress all routes

mongoose.connect(
    process.env.MONGODB_URI,
    {
	    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
		replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } },
    },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

app.use(express.json()); //parses incoming requests with JSON payloads

app.use('/', routes); //to use the routes

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('App is listening on port ' + listener.address().port)
})

