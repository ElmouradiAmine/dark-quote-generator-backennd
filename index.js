const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./routes');

require('dotenv').config()
console.log(process.env.MONGO_URL);

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


const app = express()
app.use(cors());
app.use(bodyParser.json()); // Here we use the body parser middleware to parse the json body of the request

app.use('/api', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started on port", 3000);
})