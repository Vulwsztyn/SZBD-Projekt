var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    // app.get('/dodaj/plan', function(req, res){
    //     res.render('dodaj/wydzial');
    // });
    app.post('/dodaj/plan', async function (req, res) {
        var sem=req.body.sem;
        var grupa = req.body.grupa;
        var strona = req.body.strona;
        var dzien = req.body.dzien;
        var godzina = req.body.godzina;
        var prowadzacy = req.body.prowadzacy;
        var przedmiot = req.body.przedmiot;
        var typ = req.body.typ;
        var sala = req.body.sala;
        console.log(dzien);
        console.log(grupa);
        console.log(przedmiot);
        console.log(typ);
        console.log(godzina);
        console.log(prowadzacy);
        console.log(strona);
        console.log(sala);
        console.log(sem);
        const sql = 'insert into zajecia_w_planie(dzien_tygodnia,grupa_id,zajecia_id,godzina_id,pracownik_id,strona_grupy,sala) ' +
            'values(:dzien,:grupa,(select id from zajecia where przedmiot_id=:przedmiot and typ=:typ),:godzina,:prowadzacy,:strona,:sala)';
        const binds = {
    dzien:dzien,
    grupa:grupa,
    przedmiot:przedmiot,
    typ:typ,
    godzina:godzina,
    prowadzacy:prowadzacy,
    strona:strona,
    sala:sala
        };
        const opt = {
            autoCommit: true,
        };
        await insertFunctions.insertOne(sql, binds, opt);
        res.redirect('/wyswietl/plan?semestr='+sem);
    });
};