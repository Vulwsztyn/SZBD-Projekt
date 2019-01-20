var updateFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/dodaj/ocena', async function (req, res) {
        let sid = req.body.sid;
        let zaj = req.body.zaj;
        let dodaj = req.body.dodaj;
        let prowadzacy = req.body.prowadzacy;
        let ocena = req.body.ocena;
        let sem = req.body.sem;

        let binds = {
            w:ocena,
            s: sid,
            p:prowadzacy,
            z:zaj
        };
        let sql = "";
        if (dodaj==="d") {
            sql = 'insert into oceny(wartosc,zajecia_id,student_id,pracownik_id) values(:w,:z,:s,:p)'
        }
        if (dodaj==='e') {
            sql = 'update oceny set wartosc=:w,pracownik_id=:p where student_id=:s and zajecia_id=:z'

        }
        const opt = {
            autoCommit: true,
        };

        async function test() {
            await updateFunctions.insertOne(sql, binds, opt);
        }

        let blad = "";
        await test().catch((err) => {
            console.log(err.message);
            // if (err.message.includes('PESEL_UN')) {
            //     blad = '&blad=pesel';
            //     blad += "&pesel=" + req.body.pesel;
            // }
        });
        res.redirect('/wyswietl/oceny?semestr=' + sem + '&student=' + sid);
    })
};
