var oracledb = require('oracledb');
var SimpleOracleDB = require('simple-oracledb');
var dbConfig = require('../../config/db.js');
var async = require('async');

SimpleOracleDB.extend(oracledb);

async function getWydzialy(){
     oracledb.run({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
    }, function onConnection(connection, callback) {
        connection.query('SELECT * from wydzialy', [], function onResults(error, results)
        {
            if (error) {

            } else {
                wydzialy=results;
                // console.log(wydzialy);
            }
            connection.release();
        })});
    return wydzialy;
}
module.exports = function(app){
    app.get('/dodaj/Kierunek', async function (req, res) {
        let wydzialy = await getWydzialy();
        res.render('dodaj/kierunek', {wydzialy: wydzialy});
    });
    app.post('/dodaj/Kierunek', async function (req, res) {
        console.log(req.body);
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
                    console.log(output);
                }
            });

        }, function onActionDone(error, result) {
            connection.release();
        });
        res.redirect('/');
    });

};

