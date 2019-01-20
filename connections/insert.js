var oracledb = require('oracledb');
var dbConfig = require('../config/db.js');


//Funkcje asynchroniczne, więc zwracają promise, tutaj w sumie nie ma za dużo
//Jak skończymy normalne funkcjonowanie, to się będę bawił errorami inputu
module.exports = {
    insertOne: function (sql,binds,options){
        return new Promise(async function(resolve, reject) {
            let conn;
            let blad=null;
            try {

                conn = await oracledb.getConnection({
                    user          : dbConfig.user,
                    password      : dbConfig.password,
                    connectString : dbConfig.connectString
                });

                let result = await conn.execute(
                    sql,binds,options
                );
                //To, że jest let result = await ...,  a w następnej lini resolve jest istotne
                resolve(result);
            } catch (err) { // catches errors in getConnection and the query
                blad=err;
                reject(blad);
            } finally {
                if (conn) {   // the conn assignment worked, must release
                    try {
                        await conn.release();
                        if(blad){

                        }
                    } catch (e) {

                        console.error(e);
                    }
                }
            }

        });
    },

    insertMany: function (sql,binds,options){
        return new Promise(async function(resolve, reject) {
            let conn;
            try {
                conn = await oracledb.getConnection({
                    user          : dbConfig.user,
                    password      : dbConfig.password,
                    connectString : dbConfig.connectString
                });
                let result = await conn.executeMany(sql, binds, options);
                //To, że jest let result = await ...,  a w następnej lini resolve jest istotne
                resolve(result);
            }
            catch (err) { // catches errors in getConnection and the query
                throw err;
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
};
