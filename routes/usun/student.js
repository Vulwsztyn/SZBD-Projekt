var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/usun/student', async function (req, res) {
        let k = req.body.s;
        const sql = ' BEGIN usunosobe(:k); END;';
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
        res.redirect('/grupa?grupa='+req.body.g);
    });
};