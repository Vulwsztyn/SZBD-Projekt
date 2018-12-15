var oracledb = require('oracledb');
var dbConfig = require('../../config/db.js');
var async = require('async');

var selectAllfun = require ('../../connections/selectAllfun');

module.exports = function(app){

    app.get('/dodaj/Kierunek', async function (req, res) {
        const wydzialy = await selectAllfun.selectAllFromTable("wydzialy");
        res.render('dodaj/kierunek', {wydzialy: wydzialy});
    });

    app.post('/dodaj/Kierunek', async function (req, res) {
        oracledb.run({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        }, function onConnection(connection, callback) {
            connection.insert('insert into kierunki(nazwa,wydzial_id) values(:a,:b)', {
                a: req.body.nazwa,
                b: req.body.wydzial
            }, {
                autoCommit: true,
            }, function onResults(error, output) {
                if(error){
                    console.error(error.message);
                }
                else{
                    // console.log(output);
                }
            });

        }, function onActionDone(error, result) {
            connection.release();
        });
        res.redirect('/');
    });

};

