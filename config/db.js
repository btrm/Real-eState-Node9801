const mongoose = require("mongoose");
const config = require("config");

const url = config.get("MONGODB.uri");

mongoose
    .connect(url, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useNewUrlParser: true })
    .then(() => {
        console.log("Connected to mongo server successfully! :) \n");
    })
    .catch(err => {
        console.log("Failed to connect to mongo server :( \n ");
        console.log(err);
    });

module.exports = mongoose;
