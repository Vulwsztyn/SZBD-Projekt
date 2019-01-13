var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/semestr', async function (req, res) {
        const sql = 'select * from semestry s left join kierunki k on s.kierunek_id=k.id left join wydzialy w on w.skrot=k.wydzial_id where s.id=:s';
        const binds = {
            s:req.query.semestr,
        };
        const semestr = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from grupy where semestr_id=:s';
        const grupy = await selectFun.select(sql2,binds,{});
        const sql3 = 'select * from przedmioty where semestr_id=:s';
        const przedmioty = await selectFun.select(sql3,binds,{});
        res.render('semestr',{
            semestr:semestr.rows[0],
            grupy:grupy,
            przemioty:przedmioty
        });
    });
};