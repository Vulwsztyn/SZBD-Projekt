var oracledb = require('oracledb');
var SimpleOracleDB = require('simple-oracledb');
var dbConfig = require('../../config/db.js');

SimpleOracleDB.extend(oracledb);

module.exports = function(app){
    app.get('/dodaj/Wydzial', function(req, res){
        res.render('dodaj/wydzial');
    });
    app.post('/dodaj/Wydzial', function(req, res){
        nazwa=req.body.nazwa;
        skrot=req.body.skrot;
        oracledb.run({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        }, function onConnection(connection, callback) {
            connection.insert('insert into wydzialy(nazwa,skrot) values(:a,:b)', {
                a: nazwa,
                b: skrot
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
