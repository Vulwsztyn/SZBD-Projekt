var oracledb = require('oracledb');
var SimpleOracleDB = require('simple-oracledb');
var dbConfig = require('../../config/db.js');
var async = require('async');

SimpleOracleDB.extend(oracledb);

function getWydzialy() {
    return new Promise(async function(resolve, reject) {
        let conn;
        try {
            conn = await oracledb.getConnection({
                user          : dbConfig.user,
                password      : dbConfig.password,
                connectString : dbConfig.connectString
            });

            let result = await conn.execute(
                'SELECT nazwa,skrot from wydzialy'
            );
            resolve(result);

        } catch (err) { // catches errors in getConnection and the query
            reject(err);
        } finally {
            if (conn) {   // the conn assignment worked, must release
                try {
                    await conn.release();
                } catch (e) {
                    console.error(e);
                }
            }
        }
    });
}

module.exports = function(app){
    app.get('/dodaj/Kierunek', async function (req, res) {
        let wydzialy = await getWydzialy();
        console.log(wydzialy);
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

