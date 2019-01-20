var insertFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/dodaj/zespol', async function (req, res) {
        let z = req.body.z;
        let w = req.body.w;
        const sql = 'insert into zespoly(nazwa,wydzial_id) values(:z,:w)';
        const binds = {
            z:z,
            w:w
        };
        const opt = {
            autoCommit: true,
        };
        async function test() {
            await insertFunctions.insertOne(sql, binds, opt);
        }
        let blad="";
        await test().catch((err) => {
            console.log(err.message);
            if (err.message.includes('ZESPOL_NA_WYDZIAL_UN')){
                blad='&blad=nz';
            }
            blad+="&nz="+z;
        });

        res.redirect('/wydzial?wydzial='+w+blad);
    });
};
