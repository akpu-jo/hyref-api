const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var env = require('dotenv').config();
const http = require('http');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static("public"));

mongoose.connect("mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb", {
    auth: {
        user: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
})
    .then(() => console.log('Connection to CosmosDB successful'))
    .catch((err) => console.error(err));

const Provider = mongoose.model("Provider", new mongoose.Schema({
    provider_name: String,
    category: String,
    coverage_type: String,
    phone: String,
    location: {
        address: String,
        city: String,
        state: String
    },
    email: String,
    specialist_clinic: [
        {
            specialist_type: String,
            is_inhouse: Boolean,
            on_request: Boolean,
            clinic_days_time: Array,
        }
    ]
}));


app.get("/", (req, res) => {
    res.json("Wellcome to HyRef API, for the list of providers and their specialist clinics, please follow the link https://hyref.azurewebsites.net/providers")
});

app.get("/providers", function (req, res) {
    Provider.find(function (err, providerList) {
        if (!err) {
            res.send(providerList)
        } else {
            res.send(err);
        }
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server running at port 3000");
});


