const port =3000; //numer portu
var express = require('express');//z tego głównie chcę korzystać, bo ponoć mucio ułatwia
var http = require('http'); //to jest podstawowy moduł do http
var url = require('url'); //to ładnie kroi url'e
var session = require('express-session'); //to obsługuje sesję (bycie zalogowanym)
var fs = require('fs'); //to obsługuje otwieraniie plików
var formidable = require('formidable'); //to jest do uploadu plików
var events = require('events'); //z nazwy wynika
var app = express();//w sumie nie wiem, dlaczego przy reszcie wystarczy require,a  tu nie
var router = express.Router(); //jeszcze nie wiem, ale sie przyda
var myRouter = require('./myRouter.js');

//routowanie idzie do myRouter.js
app.use('/', myRouter); //przerzuca cały routing na myRouter
//app.use('/adolf', myRouter); //przerzuca routing localhost:port/adolf na myRouter

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//Użyj: "node server.js" 
//dla testu:
//http://localhost:3000/users/34/books/8989
//https://expressjs.com/en/guide/routing.html