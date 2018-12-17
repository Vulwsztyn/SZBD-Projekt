

var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.get('/dodaj/Wydzial', function(req, res){
        res.render('dodaj/wydzial');
    });
    app.post('/dodaj/Wydzial', async function (req, res) {
        nazwa = req.body.nazwa;
        skrot = req.body.skrot;
        const sql = 'insert into wydzialy(nazwa,skrot) values(:a,:b)';
        const binds = {
            a: nazwa,
            b: skrot
        };
        const opt = {
            autoCommit: true,
        };
        await insertFunctions.insertOne(sql, binds, opt);
        res.redirect('/');
    });
};
