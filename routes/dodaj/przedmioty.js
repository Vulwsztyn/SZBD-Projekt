var oracledb = require('oracledb');
var insertFunctions = require ('../../connections/insert');
var selectFun = require ('../../connections/select');
module.exports = function(app){
    app.get('/dodaj/przedmioty', async function (req, res) {
        const result = await selectFun.selectAllNoBinds(`SELECT w.nazwa as wydzial,k.nazwa as kierunek,s.tryb,s.stopien,s.numer,p.przedmioty,s.id
                    FROM semestry s
                    inner join kierunki k on s.kierunek_id=k.id
                    inner join wydzialy w on k.wydzial_id=w.skrot 
                    left join przedmiotycat p on p.semestr_id=s.id order by  w.nazwa,k.nazwa,s.tryb,s.stopien,s.numer`);

        res.render('dodaj/przedmioty', {result:result});
    });
    app.post('/dodaj/przedmioty', async function (req, res) {
        console.log(req.body);
        let sql = 'insert into przedmioty(nazwa,semestr_id,ects) values(:naz,:sem,:ects)';
        const binds = {
            sem: parseInt(req.body.semestr),
            naz: req.body.przedmiot,
            ects: parseInt(req.body.ECTS)
        };
        const opt = {
            autoCommit: true,
        };
        await insertFunctions.insertOne(sql, binds, opt);
        let bindsZaj=[];
        if(req.body.w) bindsZaj.push([
            "w",
             req.body.przedmiot,
             parseInt(req.body.semestr)
        ]);
        if(req.body.c) bindsZaj.push([
           "c",
             req.body.przedmiot,
            parseInt(req.body.semestr)
        ]);
        if(req.body.l) bindsZaj.push([
            "l",
           req.body.przedmiot,
             parseInt(req.body.semestr)
        ]);
        sql = "INSERT INTO zajecia(typ, przedmiot_id) VALUES (:1,(select id from przedmioty where nazwa=:2 and semestr_id=:3))";
        const options = {
            autoCommit: true,   // autocommit if there are no batch errors
            batchErrors: true,
            bindDefs: [         // describes the data in 'binds'
                {type: oracledb.STRING, maxSize: 3},
                {type: oracledb.STRING, maxSize: 38},
                {type: oracledb.NUMBER}
            ]
        };
        await insertFunctions.insertMany(sql,bindsZaj,options);
        res.redirect('/dodaj/przedmioty');
    });
};