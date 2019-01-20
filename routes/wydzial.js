var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/wydzial', async function (req, res) {
        const wydzialID=req.query.wydzial;

        let blad=(req.query.blad) ? req.query.blad : '';
        let sw=(req.query.sw) ? req.query.sw : "";
        let nw = (req.query.nw) ? req.query.nw : "";
        let nk = (req.query.nk) ? req.query.nk : "";

        const sql = 'select * from kierunki where wydzial_id=:w';
        const binds = {
            w:wydzialID,
        };
        const kierunki = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from wydzialy where id=:w';
        const wydzial = await selectFun.select(sql2,binds,{});
        res.render('wydzial',{
            kierunki:kierunki,
            wydzial:wydzial.rows[0],
            blad:blad,
            nw:nw,
            sw:sw,
            nk:nk
        });
    });
};