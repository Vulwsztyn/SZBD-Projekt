var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/usun/zespol', async function (req, res) {
        let k = req.body.zespol;
        const sql = ' BEGIN usunzespol(:k); END;';
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
        res.redirect('/wydzial?wydzial='+req.body.wydzial);
    });
};