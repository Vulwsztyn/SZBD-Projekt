var express = require('express');
var router = express.Router();

//Routes
require('./routes/index')(router);
require('./routes/wydzial')(router);
require('./routes/kierunek')(router);
require('./routes/semestr')(router);
require('./routes/przedmiot')(router);
require('./routes/grupa')(router);
require('./routes/pracownicy')(router);
require('./routes/student')(router);

require('./routes/selectAll')(router);
require('./routes/dodaj')(router);
require('./routes/wyswietl')(router);


router.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
});

//Other routes here
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});
//export this router to use in our index.js
module.exports = router;