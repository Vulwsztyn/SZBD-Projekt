var express = require('express');
var router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.get('/', function (req, res) {
    res.send('hello world')
});

router.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
});

//export this router to use in our server.js
module.exports = router;