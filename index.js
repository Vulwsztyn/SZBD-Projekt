const port =3000; //numer portu
var express = require('express');//z tego głównie chcę korzystać, bo ponoć mucio ułatwia
var http = require('http'); //to jest podstawowy moduł do http
var url = require('url'); //to ładnie kroi url'e
var session = require('express-session'); //to obsługuje sesję (bycie zalogowanym)
var fs = require('fs'); //to obsługuje otwieraniie plików
var formidable = require('formidable'); //to jest do uploadu plików
var events = require('events'); //z nazwy wynika

//Do formularzy:
//https://www.tutorialspoint.com/expressjs/expressjs_form_data.htm
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var router = express.Router(); //jeszcze nie wiem, ale sie przyda
var myRouter = require('./myRouter.js');

var app = express();//w sumie nie wiem, dlaczego przy reszcie wystarczy require,a  tu nie



//żeby używać puga i dodaje że w views będą pliki do wyświetlnia w pugu
app.set('view engine', 'pug');
app.set('views','./views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww- (bez tego nie ogarnia form - wyswietla "{}")
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));





//KONIEC IMPORTÓW

//routowanie idzie do myRouter.js
app.use(myRouter); //przerzuca cały routing na myRouter

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


//Użyj: "nodemon index.js"
//dla testu:
//http://localhost:3000/users/34/books/8989
//https://expressjs.com/en/guide/routing.html