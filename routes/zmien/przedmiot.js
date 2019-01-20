var updateFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/zmien/Przedmiot', async function (req, res) {
        let p = req.body.p;
        let sql ="";
        let binds="";
        console.log(p);
        console.log(req.body.ects);
        console.log(req.body.nazwa);
        if(req.body.ects){
            sql = 'update przedmioty ' +
                'set ects=:n ' +
                'where id=:s';
            binds = {
                n: req.body.ects,
                s: p
            };
        }
        if(req.body.nazwa){
            sql = 'update przedmioty ' +
                'set nazwa=:n ' +
                'where id=:s';
            binds = {
                n: req.body.nazwa,
                s: p
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
            if (err.message.includes('NAZWA_W_SEM_UN')){
                blad='&blad=np';
                blad+="&np="+req.body.nazwa;
            }

        });
        res.redirect('/przedmiot?przedmiot='+p+blad);
    });
};