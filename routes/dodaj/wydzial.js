

var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.get('/dodaj/Wydzial', function(req, res){
        res.render('dodaj/wydzial');
    });
    app.post('/dodaj/Wydzial', async function (req, res) {
        let nazwa = req.body.nazwa;
        let skrot = req.body.skrot;
        const sql = 'insert into wydzialy(nazwa,skrot) values(:a,:b)';
        const binds = {
            a: nazwa,
            b: skrot
        };
        const opt = {
            autoCommit: true,
        };
        async function test() {
            await insertFunctions.insertOne(sql, binds, opt);
        }
        let blad="";
        await test().catch((err) => {
            console.log(err.message);
            if (err.message.includes('WYDZIALY_NAZWA_UN')){
                blad='?blad=nazwa';
            }
            if (err.message.includes('WYDZIALY_SKROT_UN')){
                blad='?blad=skrot';
            }
            blad+="&nazwa="+nazwa+'&skrot='+skrot;
        });
        res.redirect('/'+blad);
    });
};
