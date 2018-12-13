var express = require('express');
var router = express.Router();

//Routes
var seceltAllRoute = require('./routes/selectAll');

router.get('/', function(req, res){
    res.render('frontpage');
});

require('./routes/selectAll')(router);
require('./routes/dodaj')(router);


router.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
});

//Other routes here
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});
//export this router to use in our index.js
module.exports = router;