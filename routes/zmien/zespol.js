var updateFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/zmien/zespol', async function (req, res) {
        let z = req.body.z;
        let sql ="";
        let binds="";

        if(req.body.wydzial){
            sql = 'update zespoly ' +
                'set wydzial_id=:n ' +
                'where id=:s';
            binds = {
                n: req.body.wydzial,
                s: z
            };
        }
        if(req.body.nazwa){
            sql = 'update zespoly ' +
                'set nazwa=:n ' +
                'where id=:s';
            binds = {
                n: req.body.nazwa,
                s: z
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
            console.log("zmien zespol");
            console.log(err.message);
            if (err.message.includes('ZESPOL_NA_WYDZIAL_UN')){
                if(req.body.nazwa){
                    blad='&blad=nk';
                    blad+="&nk="+req.body.nazwa
                }
                if(req.body.wydzial){
                    blad='&blad=wk';
                }

            }
        });
        console.log(blad);
        console.log('/zespol?zespol='+z+blad);
        res.redirect('/zespol?zespol='+z+blad);
    });
};