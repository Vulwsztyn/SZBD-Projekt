
var selectFun = require ('../../connections/select');
module.exports = function(app){
    app.get('/wyswietl/plan', async function (req, res) {

        const result = await selectFun.selectAllNoBinds(`SELECT w.nazwa as wydzial,k.nazwa as kierunek,s.tryb,s.stopien,s.numer,s.id
                    FROM semestry s
                    inner join kierunki k on s.kierunek_id=k.id
                    inner join wydzialy w on k.wydzial_id=w.skrot 
                    `);

        res.render('wyswietl/wyborSemestruPlanu', {result:result});
    });
    app.post('/wyswietl/plan', async function (req, res) {
        sem = req.body.semestr;
        const sql = 'select * from Plan_Zajec where sem=:sem';
        const binds = {
            sem: sem,
        };
        const result = await selectFun.select(sql,binds,{});

        const sql2 = 'select count(*) from Grupy_Dziekanskie where semestr_id=:sem';
        const liczbaGrup = await selectFun.select(sql2,binds,{});

        const sql3 = 'select count(*) from godziny_zajec';
        const liczbaGodzin = await selectFun.select(sql3,{},{});

        res.render('wyswietl/plan', {result:result,liczbaGodzin:liczbaGodzin.rows[0][0],liczbaGrup:liczbaGrup.rows[0][0]});

    });
};