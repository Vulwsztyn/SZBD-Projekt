var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/kierunek', async function (req, res) {
        const sql = 'select * from semestry where kierunek_id=:k';

        let blad=(req.query.blad) ? req.query.blad : '';
        let nk = (req.query.nk) ? req.query.nk : "";

        const binds = {
            k:req.query.kierunek,
        };
        const result = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from kierunki k inner join wydzialy w on k.wydzial_id=w.id where k.id=:k';
        const kierunek = await selectFun.select(sql2,binds,{});
        const sql3 = 'select id,nazwa from wydzialy';
        const wydzialy = await selectFun.select(sql3,{},{});
        res.render('kierunek',{
            semestry:result,
            kierunek:kierunek.rows[0],
            wydzialy:wydzialy.rows,
            blad:blad,
            nk:nk
        });
    });
};