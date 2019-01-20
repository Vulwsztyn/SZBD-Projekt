

var updateFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/zmien/pracownik', async function (req, res) {
        let s = req.body.s;
        let sql ="";
        let binds="";
        if(req.body.imie){
            sql = 'update osoby ' +
                'set imie=:n ' +
                'where id=:s';
            binds = {
                n: req.body.imie,
                s: s
            };
        }
        if(req.body.nazwisko){
            sql = 'update osoby ' +
                'set nazwisko=:n ' +
                'where id=:s';
            binds = {
                n: req.body.nazwisko,
                s: s
            };
        }
        if(req.body.pesel){
            sql = 'update osoby ' +
                'set pesel=:n ' +
                'where id=:s';
            binds = {
                n: req.body.pesel,
                s: s
            };
        }
        if(req.body.tytul){
            sql = 'update pracownicy ' +
                'set stopien=:n ' +
                'where id=:s';
            binds = {
                n: req.body.tytul,
                s: s
            };
        }
        if(req.body.zespol){
            sql = 'update pracownicy ' +
                'set zespol_id=:n ' +
                'where id=:s';
            binds = {
                n: req.body.zespol,
                s: s
            };
        }
        const opt = {
            autoCommit: true,
        };
        async function test() {
            await updateFunctions.insertOne(sql, binds, opt);
        }
        let blad="";
        await test().catch((err) => {
            console.log(err.message);
            if (err.message.includes('PESEL_UN')){
                blad='&blad=pesel';
                blad+="&pesel="+req.body.pesel;
            }

        });
        res.redirect('/pracownik?pracownik='+s+blad);
    });
};