var updateFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/zmien/grupa', async function (req, res) {
        let g = req.body.g;
        let sql ="";
        let binds="";
        if(req.body.symbol){
            sql = 'update grupy ' +
                'set symbol=:n ' +
                'where id=:s';
            binds = {
                n: req.body.symbol,
                s: g
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
            if (err.message.includes('GRUPA_NA_SEMESTR__UN')){
                blad="&blad=s"
            }
            blad+="&symbol="+req.body.symbol;
        });
        res.redirect('/grupa?grupa='+g+blad);
    });
};