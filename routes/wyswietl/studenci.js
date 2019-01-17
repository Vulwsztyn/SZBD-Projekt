
var selectFun = require ('../../connections/select');


module.exports = function(app){
    app.get('/wyswietl/studenci', async function (req, res) {
        const sql = 'select id,imie,nazwisko,pesel from studenci s natural join osoby o';

        const result = await selectFun.select(sql, {}, {});

        res.render('wyswietl/studenci',{result:result});
    });
    app.post('/wyswietl/studenci', async function (req, res) {

    });
};
