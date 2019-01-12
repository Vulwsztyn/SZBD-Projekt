
var selectFun = require ('../../connections/select');


module.exports = function(app){
    app.get('/wyswietl/student', async function (req, res) {
        const sid = req.query.sid;
        const sql = 'select s.id,o.imie,o.nazwisko,o.pesel,w.nazwa,k.nazwa,g.symbol,s.strona_grupy,sem.numer from studenci s inner join osoby o on o.id=s.id inner join grupy_dziekanskie g on s.grupa_id=g.id inner join semestry sem on sem.id=g.semestr_id inner join kierunki k on k.id=sem.kierunek_id inner join wydzialy w on k.wydzial_id=w.skrot where s.id=:id';
        const binds = {
            id: sid,
        };
        const result = await selectFun.select(sql, binds, {});
        const sql2='select * from semestry where kierunek_id=(select kierunek_id from semestry where id=(select semestr_id from grupy_dziekanskie where id=(select grupa_id from studenci where id=:id)))';
        const semestry = await selectFun.select(sql2, binds, {});
        res.render('wyswietl/student',{result:result,semestry:semestry});
    });
    app.post('/wyswietl/student', async function (req, res) {

    });
};
