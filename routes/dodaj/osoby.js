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
        mod1=req.body.mod1;
        mod2=req.body.mod2;
        if(typ=='Student') {
            const sql = 'insert into osoby(imie,nazwisko,pesel,haslo,typ) values(:a,:b,:c,:b,:d));' +
                'insert into studenci(id) values((select id from osoby where pesel=:c),:e,:f);';
        }else{
            const sql = 'insert into osoby(imie,nazwisko,pesel,haslo,typ) values(:a,:b,:c,:b,:d);' +
                'insert into pracownicy(id) values((select id from osoby where pesel=:c),:e,:f);';
        }
        const binds = {
            a: imie,
            b: nazwisko,
            c: pesel,
            d: typ,
            e: mod1,
            f: mod2
        };
        const opt = {
            autoCommit: true,
        };
        await insertFunctions.insertOne(sql, binds, opt);
        res.redirect('/');
    });
};