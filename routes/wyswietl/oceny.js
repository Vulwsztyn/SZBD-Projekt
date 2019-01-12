
var selectFun = require ('../../connections/select');
module.exports = function(app){
    app.get('/wyswietl/oceny', async function (req, res) {

        const sql =
            `with rzecz as
(SELECT 
z.id,
p.nazwa,
p.ects,
z.typ,
o.wartosc,
op.imie,
op.nazwisko,
pr.stopien
from zajecia z 
right join przedmioty p on p.id=z.przedmiot_id 

left join oceny o on o.zajecia_id=z.id
left join osoby op on op.id = o.pracownik_id 
left join pracownicy pr on pr.id=op.id 
where z.id in (select id from zajecia where przedmiot_id in (select id from przedmioty where semestr_id=:sem)) and o.student_id=:sid)
select p.nazwa,p.ects,z.typ,r.wartosc,r.imie,r.nazwisko,r.stopien,
(select count(*) from zajecia where przedmiot_id=p.id) as liczba,z.id
from rzecz r
right join zajecia z on r.id=z.id
right join przedmioty p on p.id=z.przedmiot_id where z.id in (select id from zajecia where przedmiot_id in (select id from przedmioty where semestr_id=:sem))`;
        const binds = {
            sid:req.query.sid,
            sem:req.query.sem
        };
        const result = await selectFun.select(sql, binds, {});
        const sql2='select srednia(:sid,:sem) from dual';
        const srednia = await selectFun.select(sql2, binds, {});
        const sql7 = 'select p.id,p.stopien,o.imie,o.nazwisko,o.pesel from pracownicy p inner join osoby o on o.id=p.id order by o.nazwisko, o.imie,p.stopien';
        const prowadzacy = await selectFun.select(sql7,{},{});

        res.render('wyswietl/oceny', {result:result,srednia:srednia.rows,prowadzacy:prowadzacy,sid:req.query.sid});
    });
};