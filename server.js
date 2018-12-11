const port =3000
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
})

app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))