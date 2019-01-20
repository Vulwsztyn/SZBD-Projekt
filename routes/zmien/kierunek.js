var updateFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/zmien/Kierunek', async function (req, res) {
        let k = req.body.k;
        let sql ="";
        let binds="";

        if(req.body.wydzial){
            sql = 'update kierunki ' +
                'set wydzial_id=:n ' +
                'where id=:s';
            binds = {
                n: req.body.wydzial,
                s: k
            };
        }
        if(req.body.nazwa){
            sql = 'update kierunki ' +
                'set nazwa=:n ' +
                'where id=:s';
            binds = {
                n: req.body.nazwa,
                s: k
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
            console.log("zmien kierunek");
            console.log(err.message);
            if (err.message.includes('KIERUNEK_NA_WYDZIAL_UN')){
                if(req.body.nazwa){
                    blad='&blad=nk';
                    blad+="&nk="+req.body.nazwa
                }
                if(req.body.wydzial){
                    blad='&blad=wk';
                }

            }
        });
        res.redirect('/kierunek?kierunek='+k+blad);
    });
};