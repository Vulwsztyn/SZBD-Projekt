var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/grupa', async function (req, res) {
        let blad=(req.query.blad) ? req.query.blad : '';
        let imie=(req.query.imie) ? req.query.imie : "";
        let nazwisko = (req.query.nazwisko) ? req.query.nazwisko : "";
        let pesel = (req.query.pesel) ? req.query.pesel : "";
        let nowySymbol = (req.query.symbol) ? req.query.symbol : "";

        const sql = 'select * from grupy g left join semestry s on g.semestr_id=s.id left join kierunki k on s.kierunek_id=k.id left join wydzialy w on w.id=k.wydzial_id where g.id=:g';
        const binds = {
            g:req.query.grupa,
        };
        const grupa = await selectFun.select(sql,binds,{});
        const sql2 = 'select id from studenci s natural join osoby o where grupa_id=:g';
        const studenci = await selectFun.select(sql2,binds,{});
        res.render('grupa',{
            grupa:grupa.rows[0],
            studenci:studenci,
            imie:imie,
            nazwisko:nazwisko,
            pesel:pesel,
            blad:blad,
            nowySymbol:nowySymbol
        });
    });
};


