const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let ejs = require('ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var clicked = "Today";

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})
app.get("/content", function(req, res){
    res.render("content");
})
app.get("/forum", function(req, res){
    res.render("forum");
})
app.get("/faq", function(req, res){
    res.render("faq");
})
app.get("/personal", function(req, res){
    res.render("personal");
})
app.get("/login", function(req, res){
    res.render("login");
})
app.get("/about", function(req, res){
    res.render("about");
})
app.get("/muhammet", function(req, res){
    res.render("muhammet");
})
app.get("/sachio", function(req, res){
    res.render("sachio");
})
app.get("/maggie", function(req, res){
    res.render("maggie");
})
app.get("/vincent", function(req, res){
    res.render("vincent");
})
app.get("/jane", function(req, res){
    res.render("jane");
})

app.listen(3000, function(){
    console.log("Server is up and running");
    
})
