var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/godziny', async function (req, res) {
        const sql = 'select * from godziny_zajec';
        const binds = {

        };
        const godziny = await selectFun.select(sql,binds,{});

        res.render('godziny',{
            godziny:godziny
        });
    });
};