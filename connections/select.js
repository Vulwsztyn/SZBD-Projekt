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
    selectSemToAddGroup: function (tableName){
        return new Promise(async function(resolve, reject) {
            let conn;
            try {
                conn = await oracledb.getConnection({
                    user          : dbConfig.user,
                    password      : dbConfig.password,
                    connectString : dbConfig.connectString
                });

                let result = await conn.execute(
                    `SELECT w.nazwa as wydzial,k.nazwa as kierunek,s.tryb,s.stopien,s.numer,g.grupy,s.id
                    FROM semestry s
                    inner join kierunki k on s.kierunek_id=k.id
                    inner join wydzialy w on k.wydzial_id=w.skrot 
                    left join GrupyCat g on g.semestr_id=s.id order by  w.nazwa,k.nazwa,s.tryb,s.stopien,s.numer`,
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
