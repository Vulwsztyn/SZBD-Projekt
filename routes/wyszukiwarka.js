var selectFun = require ('../connections/select');
module.exports = function(app) {
    app.get('/wyszukiwarka', async function  (req, res) {
        if(req.query.wyszukaj==='1'){
            const sql = 'select * from '+req.query.which+' where '+req.query.param+'=:i';
            const binds = {
                i:req.query.input,
            };
            const wynik = await selectFun.select(sql,binds,{});
            if(req.query.which==='osoby')
                res.render('wyszukiwarka',{
                    osoby:wynik
                });
            if(req.query.which==='wydzialy')
                res.render('wyszukiwarka',{
                    wydzialy:wynik
                });
            if(req.query.which==='kierunki')
                res.render('wyszukiwarka',{
                    kierunki:wynik
                });
            if(req.query.which==='przedmioty')
                res.render('wyszukiwarka',{
                    przedmioty:wynik
                });
        }else res.render('wyszukiwarka',{});
    });
}