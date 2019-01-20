var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/pracownik', async function (req, res) {
        const sql = 'select * from pracownicy p inner join osoby o on o.id=p.id inner join zespoly z on p.zespol_id=z.id inner join wydzialy w on w.id=z.wydzial_id where p.id=:k';
        const binds = {
            k:req.query.pracownik,
        };
        const pracownik = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from zespoly where wydzial_id=(select wydzial_id from zespoly where id=(select zespol_id from pracownicy where id=:k))';
        const zespoly = await selectFun.select(sql2,binds,{});
        res.render('pracownik',{
            zespoly:zespoly.rows,
            pracownik:pracownik.rows[0]
        });
    });
};