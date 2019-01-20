var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/usun/ocena', async function (req, res) {
        let sid =req.body.sid;
        let sem =req.body.sem;
        let zaj =req.body.zaj;
        const sql = ' BEGIN usunOcene(:s,:z); END;';
        const binds = {
            s:sid,
            z:zaj
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
        res.redirect('/wyswietl/oceny?semestr='+sem+'&student='+sid);
    });
};