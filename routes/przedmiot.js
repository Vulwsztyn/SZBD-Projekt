var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/przedmiot', async function (req, res) {
        const sql = 'select * from przedmioty p left join semestry s on p.semestr_id=s.id left join kierunki k on s.kierunek_id=k.id left join wydzialy w on w.skrot=k.wydzial_id where p.id=:s';
        const binds = {
            s:req.query.przedmiot,
        };
        const przedmiot = await selectFun.select(sql,binds,{});
        const sql2 = 'select typ from zajecia where przedmiot_id=:s order by typ';
        const zaj = await selectFun.select(sql2,binds,{});

        let zajecia = ['Nie', "Nie", "Nie"];
        for (let i=0;i<zaj.rows.length;i++){
            row=zaj.rows[i];
            if (row[0]==="c"){
                zajecia[0]="Tak"
            }
            if (row[0]==="l"){
                zajecia[1]="Tak"
            }
            if (row[0]==="w"){
                zajecia[2]="Tak"
            }
        }

        res.render('przedmiot',{
            przedmiot:przedmiot.rows[0],
            zajecia:zajecia
        });
    });
};