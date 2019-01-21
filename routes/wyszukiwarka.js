var selectFun = require ('../connections/select');
module.exports = function(app) {
    app.get('/wyszukiwarka', async function  (req, res) {
        if(req.query.wyszukaj==='1'){
            const wynik = await selectFun.select(sql,binds,{});
            if(req.query.which==='osoby'){
                //sql
                res.render('wyszukiwarka',{
                    osoby:wynik
                });
            }
            if(req.query.which==='wydzialy'){
                //sql
                res.render('wyszukiwarka',{
                    wydzialy:wynik
                });
            }
            if(req.query.which==='kierunki'){
                //sql
                res.render('wyszukiwarka',{
                    kierunki:wynik
                });
            }
            if(req.query.which==='przedmioty'){
                //sql
                res.render('wyszukiwarka',{
                    przedmioty:wynik
                });
            }
        }else res.render('wyszukiwarka',{});
    });
}