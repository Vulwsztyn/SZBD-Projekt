var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/usun/plan', async function (req, res) {
        let sem = req.body.sem;
        let grupa = req.body.grupa;
        let str = req.body.strona;
        let dzien = req.body.dzien;
        let godz = req.body.godzina;
        const sql = 'delete from zajecia_w_planie where grupa_id=:g and strona_grupy=:st and dzien_tygodnia=:d and godzina_id=:godz';
        const binds = {
            g:grupa,
            st:str,
            d:dzien,
            godz:godz
        };
        const opt = {
            autoCommit: true,
        };
        async function test() {
            await insertFunctions.insertOne(sql, binds, opt);
        }
        // let blad="";
        await test().catch((err) => {
            console.log(err.message);

        });
        res.redirect('/wyswietl/plan?semestr='+sem);
    });
};
