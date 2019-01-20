var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/usun/Wydzial', async function (req, res) {
        let w = req.body.wydzial;
        const sql = ' BEGIN usunwydzial(:w); END;';
        const binds = {
            w: w,
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
        res.redirect('/');
    });
};