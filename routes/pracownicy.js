var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/przedmiot', async function (req, res) {
        const sql = 'select * from semestry where kierunek_id=:k';
        const binds = {
            k:req.query.kierunek,
        };
        const result = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from kierunki k inner join wydzialy w on k.wydzial_id=w.skrot where k.id=:k';
        const kierunek = await selectFun.select(sql2,binds,{});
        res.render('kierunek',{
            semestry:result,kierunek:kierunek.rows[0]
        });
    });
};