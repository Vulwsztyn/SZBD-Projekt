var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/usun/pracownik', async function (req, res) {
        let k = req.body.pracownik;
        console.log(k);
        const sql = ' BEGIN usunpracownika(:k); END;';
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
        res.redirect('/zespol?zespol='+req.body.zespol);
    });
};