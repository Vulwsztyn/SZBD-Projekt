var selectFun = require ('../connections/select');
module.exports = function(app) {
    app.get('/wyszukiwarka', async function  (req, res) {
        if(req.query.wyszukaj==='1'){

            if(req.query.which==='osoby'){
                let sql='select * from osoby';
                let imie =req.query.Oimie;
                let nazwisko =req.query.Onazwisko;
                let pesel =req.query.Opesel;
                // where id=: and  and '
                let binds={};
                if(imie||nazwisko||pesel)sql+=' where';
                if(imie){
                    sql+=' imie like :imie';
                    if(nazwisko||pesel) sql+=' and';
                    binds.imie='%'+imie+'%';
                }
                if(nazwisko){
                    sql+=' nazwisko like :n';
                    if(pesel) sql+=' and';
                    binds.n='%'+nazwisko+'%';
                }
                if(pesel){
                    sql+=' pesel like :p';
                    binds.p='%'+pesel+'%';
                }
                sql+=' order by CAST(id AS INT)';
                const wynik= await selectFun.select(sql,binds,{});
                res.render('wyszukiwarka',{
                    osoby:wynik,
                    which:req.query.which
                });
            }
            if(req.query.which==='wydzialy'){
                let sql='select * from wydzialy';
                let w =req.query.Wnazwa;

                let binds={};
                if(w){
                    sql+=' where nazwa like :w';
                    binds.w='%'+w+'%';
                }
                const wynik= await selectFun.select(sql,binds,{});
                res.render('wyszukiwarka',{
                    wydzialy:wynik,
                    which:req.query.which
                });
            }
            if(req.query.which==='kierunki'){
                let sql='select * from kierunki';
                let k =req.query.Knazwa;
                let binds={};
                if(k){
                    sql+=' where nazwa like :k';
                    binds.k='%'+k+'%';
                }
                const wynik= await selectFun.select(sql,binds,{});
                res.render('wyszukiwarka',{
                    kierunki:wynik,
                    which:req.query.which
                });
            }
            if(req.query.which==='przedmioty'){
                let sql='select * from przedmioty';
                let p =req.query.Pnazwa;
                let binds={};
                if(p){
                    sql+=' where nazwa like :p';
                    binds.p='%'+p+'%';
                }
                const wynik= await selectFun.select(sql,binds,{});
                res.render('wyszukiwarka',{
                    przedmioty:wynik,
                    which:req.query.which
                });
            }
        }else res.render('wyszukiwarka',{});
    });


};