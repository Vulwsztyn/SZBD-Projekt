
var selectFun = require ('../../connections/select');
module.exports = function(app){
    app.get('/wyswietl/plan', async function (req, res) {
        if (!req.query.semestr) next();
        sem = req.query.semestr;
        console.log("a");
        const sql = 'select * from Plan_Zajec where sem=:sem';
        const binds = {
            sem: sem,
        };
        const result = await selectFun.select(sql,binds,{});

        const sql2 = 'select count(*) from Grupy_Dziekanskie where semestr_id=:sem';
        const liczbaGrup = await selectFun.select(sql2,binds,{});

        const sql3 = 'select count(*) from godziny_zajec';
        const liczbaGodzin = await selectFun.select(sql3,{},{});

        const sql4 = 'select * from godziny_zajec order by numer';
        const godziny = await selectFun.select(sql4,{},{});

        const sql5 = 'select * from grupy_dziekanskie where semestr_id=:sem order by symbol';
        const grupy = await selectFun.select(sql5,binds,{});

        const sql6 = 'select * from przedmioty where semestr_id=:sem order by nazwa';
        const przedmioty = await selectFun.select(sql6,binds,{});

        const sql7 = 'select p.id,p.stopien,o.imie,o.nazwisko,o.pesel from pracownicy p inner join osoby o on o.id=p.id order by o.nazwisko, o.imie,p.stopien';
        const prowadzacy = await selectFun.select(sql7,{},{});

        const sql8 = 'select * from sale order by nazwa';
        const sale = await selectFun.select(sql8,{},{});
        res.render('wyswietl/plan', {result:result,liczbaGodzin:liczbaGodzin.rows[0][0],liczbaGrup:liczbaGrup.rows[0][0],godziny:godziny,grupy:grupy,przedmioty:przedmioty,prowadzacy:prowadzacy,sale:sale,sem:sem});
    });
    app.get('/wyswietl/plan', async function (req, res) {
        if(req.query.semestr) next();
        console.log(req.query.semestr);
        const result = await selectFun.selectAllNoBinds(`SELECT w.nazwa as wydzial,k.nazwa as kierunek,s.tryb,s.stopien,s.numer,s.id
                    FROM semestry s
                    inner join kierunki k on s.kierunek_id=k.id
                    inner join wydzialy w on k.wydzial_id=w.skrot 
                    `);

        res.render('wyswietl/wyborSemestruPlanu', {result:result});
    });
};