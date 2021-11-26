require('dotenv').config({ path: 'development.env' }); // Grabs MONGODB URI

const mongoose = require('mongoose'); //import mongoose

//Connects to the mongo databse attached to heroku app
mongoose.connect(
    process.env.MONGODB_URI,
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);