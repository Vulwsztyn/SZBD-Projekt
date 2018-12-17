var oracledb = require('oracledb');
var dbConfig = require('../config/db.js');


module.exports = {
    selectAllFromTable: function (tableName) {

        switch (tableName) {
            case "godziny_zajec":
            case "grupy_dziekanskie":
            case "kierunki":
            case "oceny":
            case "osoby":
            case "pracownicy":
            case "przedmioty":
            case "sale":
            case "semestry":
            case "studenci":
            case "wydzialy":
            case "zajecia":
            case "zajecia_w_planie":
            case "zespoly":
                break;
            default:
                return;
        }
        return new Promise(async function (resolve, reject) {
            let conn;
            try {
                conn = await oracledb.getConnection({
                    user: dbConfig.user,
                    password: dbConfig.password,
                    connectString: dbConfig.connectString
                });

                let result = await conn.execute(
                    `SELECT * FROM ` + tableName,
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
    },
    selectAllNoBinds: function (sql){
        return new Promise(async function(resolve, reject) {
            let conn;
            try {
                conn = await oracledb.getConnection({
                    user          : dbConfig.user,
                    password      : dbConfig.password,
                    connectString : dbConfig.connectString
                });

                let result = await conn.execute(
                    sql,
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

}};
