var selectAllfun = require ('../connections/select');
module.exports = function(app){
    app.get('/', async function (req, res) {
        const result = await selectAllfun.selectAllFromTable('wydzialy');

        let blad=(req.query.blad) ? req.query.blad : '';
        let skrot=(req.query.skrot) ? req.query.skrot : "";
        let nazwa = (req.query.nazwa) ? req.query.nazwa : "";

        res.render('index',{
            result:result,
            blad:blad,
            skrot:skrot,
            nazwa:nazwa
        });
    });
};


