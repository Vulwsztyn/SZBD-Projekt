var selectAllfun = require ('../connections/select');
module.exports = function(app){
    app.get('/', async function (req, res) {
        const result = await selectAllfun.selectAllFromTable('wydzialy');
        res.render('index',{
            result:result,
            // metaData: result.metaData,
            // rows: result.rows,
        });
    });
};


