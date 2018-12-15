var oracledb = require('oracledb');
var dbConfig = require('../../config/db.js');
var async = require('async');

var selectAllfun = require ('../../connections/selectAllfun');
function addToList(lista,start,liczba,tryb,stopien,nazwa,wydzial){
    start=parseInt(start);
    let pora_roku='';
    for (let i=0;i<liczba;i++){
        if((start+i)%2===0)  pora_roku='letni';
        else  pora_roku='zimowy';
        let rok = Math.floor((start+i+1)/2);
        lista.push([start+i,rok,stopien,tryb,pora_roku,nazwa,wydzial]);
        // console.log(start+i);
    }
    return lista;
}
module.exports = function(app){

    app.get('/dodaj/Kierunek', async function (req, res) {
        const wydzialy = await selectAllfun.selectAllFromTable("wydzialy");
        res.render('dodaj/kierunek', {wydzialy: wydzialy});
    });

    app.post('/dodaj/Kierunek', async function (req, res) {
        // oracledb.run({
        //     user: dbConfig.user,
        //     password: dbConfig.password,
        //     connectString: dbConfig.connectString
        // }, function onConnection(connection, callback) {
        //     connection.insert('insert into kierunki(nazwa,wydzial_id) values(:a,:b)', {
        //         a: req.body.nazwa,
        //         b: req.body.wydzial
        //     }, {
        //         autoCommit: true,
        //     }, function onResults(error, output) {
        //         if(error){
        //             console.error(error.message);
        //         }
        //         else{
        //             // console.log(output);
        //         }
        //     });
        //
        // }, function onActionDone(error, result) {
        //     connection.release();
        // });
        //(numer,rok, stopien,tryb,pora_roku,kierunek_ID)
        if(req.body.nazwa){
            console.log(req.body);
            let tryb='stacjonarne';
            let lista=[]
            if(req.body.stacjonarne){
                let tryb='stacjonarne';
                if(req.body.s1 && req.body.s1l && req.body.s1r){
                    lista=addToList(lista,req.body.s1r,req.body.s1l,tryb,1,req.body.nazwa,req.body.wydzial);
                }
                if(req.body.s2 && req.body.s2l && req.body.s2r){
                    lista=addToList(lista,req.body.s2r,req.body.s2l,tryb,2,req.body.nazwa,req.body.wydzial);
                }
            }
            if(req.body.niestacjonarne){
                tryb='niestacjonarne';
                if(req.body.n1 && req.body.n1l && req.body.n1r){
                    lista=addToList(lista,req.body.n1r,req.body.n1l,tryb,1,req.body.nazwa,req.body.wydzial);
                }
                if(req.body.n2 && req.body.n2l && req.body.n2r){
                    lista=addToList(lista,req.body.n2r,req.body.n2l,tryb,2,req.body.nazwa,req.body.wydzial);
                }
            }
            console.log(lista);
        }
        else{

        }
        // console.log(req.body);
        // console.log(req.body.stacjonarne);
        // console.log(req.body.niestacjonarne);
        // console.log(req.body.stacjonarne==='on');
        // console.log(req.body.niestacjonarne===undefined);
        // console.log(!req.body.niestacjonarne);
        // if(!req.body.niestacjonarne){
        //     console.log('a');
        // }
        // else{
        //     console.log('b');
        // }
        res.redirect('/');
    });

};

