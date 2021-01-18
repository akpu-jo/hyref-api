const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://jakpu:Midi@000@hyrefcluster.se4we.mongodb.net/providerDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });

const providerSchema = {
    provider_name: String,
    category: String,
    coverage_type: String,
    phone: String,
    location: Object,
    email: String,
    specialist_clinic: Array
};

const Provider = mongoose.model("Provider", providerSchema);

app.get("/providers", function(req, res){
    Provider.find(function(err, providerList){
        if (!err) {
            res.send(providerList)
        }else{
            res.send(err);
        }
    });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


// gggggggggggggggggghhhhhhhhhhhhhhhhhhgggggggggggghhhhhhhhhhhhhgggggggggggggggg