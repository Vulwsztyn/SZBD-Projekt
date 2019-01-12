var oracledb = require('oracledb');
var dbConfig = require('../../config/db.js');

var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.get('/dodaj/Osoby', function(req, res){
        res.render('dodaj/osoby');
    });
    app.post('/dodaj/Osoby', async function (req, res) {
        imie = req.body.imie;
        nazwisko = req.body.nazwisko;
        pesel = req.body.pesel;
        haslo=req.body.nazwisko;
        typ=req.body.typ;
        const sql = 'insert into osoby(imie,nazwisko,pesel,haslo,typ) values(:a,:b,:c,:b,:d)';
        const binds = {
            a: imie,
            b: nazwisko,
            c: pesel,
            d: typ
        };
        const opt = {
            autoCommit: true,
        };
        await insertFunctions.insertOne(sql, binds, opt);
        res.redirect('/');
    });
};