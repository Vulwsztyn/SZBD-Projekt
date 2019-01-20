

var updateFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/zmien/Wydzial', async function (req, res) {
        let w = req.body.w;
        let sql ="";
        let binds="";

        if(req.body.skrot){
            sql = 'update wydzialy ' +
                'set skrot=:n ' +
                'where id=:s';
            binds = {
                n: req.body.skrot,
                s: w
            };
        }
        if(req.body.nazwa){
            sql = 'update wydzialy ' +
                'set nazwa=:n ' +
                'where id=:s';
            binds = {
                n: req.body.nazwa,
                s: w
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
            console.log("zmien wydzial");
            console.log(err.message);
            if (err.message.includes('WYDZIALY_NAZWA_UN')){
                blad='&blad=nw';
            }
            if (err.message.includes('WYDZIALY_SKROT_UN')){
                blad='&blad=sw';
            }
            if(req.body.nazwa){
                blad+="&nw="+req.body.nazwa
            }
            if(req.body.skrot){
                blad+="&sw="+req.body.skrot
            }
        });
        res.redirect('/wydzial?wydzial='+w+blad);
    });
};