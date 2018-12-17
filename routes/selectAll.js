var oracledb = require('oracledb');
var dbConfig = require('../config/db.js');
var selectAllfun = require ('../connections/select');
module.exports = function(app){
    app.get('/SelectAll/:tableName', async function (req, res) {
        const result = await selectAllfun.selectAllFromTable(req.params.tableName.toLowerCase());
        res.render('selectAll', {
            result:result,
            // metaData: result.metaData,
            // rows: result.rows,
        });
    });
};