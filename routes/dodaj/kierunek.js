var oracledb = require('oracledb');
var async = require('async');

var selectFun = require ('../../connections/select');
var insertFunctions = require ('../../connections/insert');
function addToList(lista,start,liczba,tryb,stopien,nazwa,wydzial){
    start=parseInt(start);
    let pora_roku='';
    for (let i=0;i<liczba;i++){
        if((start+i)%2===0)  pora_roku='letni';
        else  pora_roku='zimowy';
        let rok = Math.floor((start+i+1)/2);
        lista.push([start+i,rok,stopien,tryb,pora_roku,nazwa,parseInt(wydzial)]);
        // console.log(start+i);
    }
    return lista;
}
module.exports = function(app){

    app.get('/dodaj/Kierunek', async function (req, res) {
        const wydzialy = await selectFun.selectAllFromTable("wydzialy");
        res.render('dodaj/kierunek', {wydzialy: wydzialy});
    });

    app.post('/dodaj/Kierunek', async function (req, res) {
        if(req.body.nazwa){
            let tryb='';
            let binds=[];
            //wypełnianie tabelki binds wraz ze sprawdzaniem całego inputu
            if(req.body.stacjonarne){
                let tryb='stacjonarne';
                if(req.body.s1 && req.body.s1l){
                    binds=addToList(binds,1,req.body.s1l,tryb,1,req.body.nazwa,req.body.wydzial);
                }
                if(req.body.s2 && req.body.s2l){
                    let r=1;
                    if(req.body.s1l) r=parseInt(req.body.s1l)+1;
                    binds=addToList(binds,r,req.body.s2l,tryb,2,req.body.nazwa,req.body.wydzial);
                }
            }
            if(req.body.niestacjonarne){
                tryb='niestacjonarne';
                if(req.body.n1 && req.body.n1l){
                    binds=addToList(binds,1,req.body.n1l,tryb,1,req.body.nazwa,req.body.wydzial);
                }
                if(req.body.n2 && req.body.n2l){
                    let r=1;
                    if(req.body.n1l) r=parseInt(req.body.n1l)+1;
                    binds=addToList(binds,r,req.body.n2l,tryb,2,req.body.nazwa,req.body.wydzial);
                }
            }
            //Koniec tego raka
            //Funkcjom z connection trza podać 3 parametry string z poleceniem, zminne do włożenia i opcje
            const sql = "INSERT INTO semestry(numer,rok,stopien,tryb,pora_roku,kierunek_id) VALUES (:1, :2, :3,:4,:5,(select id from kierunki where nazwa=:6 and wydzial_id=:7))";
            const options = {
                autoCommit: true,   // autocommit if there are no batch errors
                batchErrors: true,  // identify invalid records; start a transaction for valid ones
                bindDefs: [         // describes the data in 'binds'
                    {type: oracledb.NUMBER},
                    {type: oracledb.NUMBER},
                    {type: oracledb.NUMBER},
                    {type: oracledb.STRING, maxSize: 38}, // size of the largest string, or as close as possible (???? - Artur)
                    {type: oracledb.STRING, maxSize: 38},
                    {type: oracledb.STRING, maxSize: 38},
                    {type: oracledb.NUMBER}
                ]
            };
            const sqlKierunek='insert into kierunki(nazwa,wydzial_id) values(:a,:b)';
            const bindsKierunek={
                a: req.body.nazwa,
                b: req.body.wydzial
            };
            optionsKierunek={autoCommit: true,};
            console.log(binds);

            async function test() {
                await insertFunctions.insertOne(sqlKierunek, bindsKierunek,optionsKierunek);
            }
            let blad="";
            await test().catch((err) => {
                console.log(err.message);
                if (err.message.includes('KIERUNEK_NA_WYDZIAL_UN')){
                    blad='&blad=nk';
                }
                blad+="&nk="+req.body.nazwa;
            });
            if(blad===""){
                await insertFunctions.insertMany(sql,binds,options);
            }
        res.redirect('/wydzial?wydzial='+req.body.wydzial+blad);
    }});

};

