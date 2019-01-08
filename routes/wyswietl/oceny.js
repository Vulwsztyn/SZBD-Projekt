
var selectFun = require ('../../connections/select');
module.exports = function(app){
    app.get('/wyswietl/oceny', async function (req, res) {

        const result = await selectFun.selectAllNoBinds(`SELECT w.nazwa as wydzial,k.nazwa as kierunek,s.tryb,s.stopien,s.numer,g.grupy,s.id
                    FROM semestry s
                    inner join kierunki k on s.kierunek_id=k.id
                    inner join wydzialy w on k.wydzial_id=w.skrot 
                    left join GrupyCat g on g.semestr_id=s.id order by  w.nazwa,k.nazwa,s.tryb,s.stopien,s.numer`);

        res.render('dodaj/grupy', {result:result});
    });
    app.post('/wyswietl/oceny', async function (req, res) {
        sem = req.body.semestr;
        gr = req.body.grupa;
        const sql = 'insert into grupy(symbol,semestr_id) values(:gr,:sem)';
        const binds = {
            sem: sem,
            gr: gr
        };
        const opt = {
            autoCommit: true,
        };
        await insertFunctions.insertOne(sql, binds, opt);
        res.redirect('/dodaj/grupy');
    });
};