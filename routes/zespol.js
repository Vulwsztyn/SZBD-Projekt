var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/zespol', async function (req, res) {
        const sql = 'select * from pracownicy p inner join osoby o on o.id=p.id where zespol_id=:k';

        let blad=(req.query.blad) ? req.query.blad : '';
        let imie=(req.query.imie) ? req.query.imie : '';
        let nazwisko=(req.query.nazwisko) ? req.query.nazwisko : '';
        let pesel=(req.query.pesel) ? req.query.pesel : '';
        let tytul=(req.query.tytul) ? req.query.tytul : '';
        let nk = (req.query.nk) ? req.query.nk : "";

        const binds = {
            k:req.query.zespol,
        };
        const pracownicy = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from zespoly z inner join wydzialy w on z.wydzial_id=w.id where z.id=:k';
        const zespol= await selectFun.select(sql2,binds,{});
        const sql3 = 'select id,nazwa from wydzialy';
        const wydzialy = await selectFun.select(sql3,{},{});
        res.render('zespol',{
            pracownicy:pracownicy,
            zespol:zespol.rows[0],
            wydzialy:wydzialy.rows,
            blad:blad,
            nk:nk,
            imie:imie,
            nazwisko:nazwisko,
            pesel:pesel,
            tytul:tytul
        });
    });
};