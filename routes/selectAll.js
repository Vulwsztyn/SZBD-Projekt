var oracledb = require('oracledb');
var dbConfig = require('../config/db.js');

module.exports = function(app){
    app.get('/SelectAll/:tableName', function(req, res){
        oracledb.getConnection(
            {
                user          : dbConfig.user,
                password      : dbConfig.password,
                connectString : dbConfig.connectString
            },
            function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                connection.execute(
                    `SELECT *
       FROM `+req.params.tableName,
                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        // console.log(result.metaData); //
                        console.log(result.rows);
                        res.render('selectAll', {
                            metaData: result.metaData,
                            rows: result.rows,
                        });
                        doRelease(connection);
                    });
            });
        function doRelease(connection) {
            connection.close(
                function(err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
        }
    });
};