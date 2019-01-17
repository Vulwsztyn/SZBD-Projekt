var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/wydzial', async function (req, res) {
        const wydzialID=req.query.wydzial;
        const sql = 'select * from kierunki where wydzial_id=:w';
        const binds = {
            w:wydzialID,
        };
        const kierunki = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from wydzialy where skrot=:w';
        const wydzial = await selectFun.select(sql2,binds,{});
        res.render('wydzial',{
            kierunki:kierunki,wydzial:wydzial.rows[0]
        });
    });
};