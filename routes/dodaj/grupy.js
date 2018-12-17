var oracledb = require('oracledb');
var dbConfig = require('../../config/db.js');

var insertFunctions = require ('../../connections/insert');
var selectFun = require ('../../connections/select');
module.exports = function(app){
    app.get('/dodaj/grupy', async function (req, res) {
        const result = await selectFun.selectSemToAddGroup();
        res.render('dodaj/grupy', {result:result});
    });
    app.post('/dodaj/grupy', async function (req, res) {
        sem = req.body.semestr;
        gr = req.body.grupa;
        const sql = 'insert into grupy(symbol,semestr_id) values(:gr,:sem)';
        const binds = {
            sem: sem,
            gr: gr
        };
        const opt = {
            autoCommit: true,
        };
        await insertFunctions.insertOne(sql, binds, opt);
        res.redirect('/dodaj/grupy');
    });
};