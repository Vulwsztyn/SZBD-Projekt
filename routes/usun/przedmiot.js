var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/usun/przedmiot', async function (req, res) {
        let k = req.body.przedmiot;
        const sql = ' BEGIN usunprzedmiot(:k); END;';
        const binds = {
            k: k,
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
        res.redirect('/semestr?semestr='+req.body.semestr);
    });
};