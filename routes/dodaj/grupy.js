var insertFunctions = require ('../../connections/insert');
var selectFun = require ('../../connections/select');
module.exports = function(app){
    app.get('/dodaj/grupy', async function (req, res) {

        const result = await selectFun.selectAllNoBinds(`SELECT w.nazwa as wydzial,k.nazwa as kierunek,s.tryb,s.stopien,s.numer,g.grupy,s.id
                    FROM semestry s
                    inner join kierunki k on s.kierunek_id=k.id
                    inner join wydzialy w on k.wydzial_id=w.skrot 
                    left join GrupyCat g on g.semestr_id=s.id order by  w.nazwa,k.nazwa,s.tryb,s.stopien,s.numer`);

        res.render('dodaj/grupy', {result:result});
    });
    app.post('/dodaj/grupy', async function (req, res) {
        let sem = req.body.sem;
        let gr = req.body.sym;
        const sql = 'insert into grupy(symbol,semestr_id) values(:gr,:sem)';
        const binds = {
            sem: sem,
            gr: gr
        };
        const opt = {
            autoCommit: true,
        };
        async function test() {
            await insertFunctions.insertOne(sql, binds, opt);
        }
        let blad="";
        await test().catch((err) => {
            console.log(err.message);
            if (err.message.includes('GRUPA_NA_SEMESTR__UN')){
                blad='&blad=ng';
                blad+="&ng="+gr;
            }

        });
        res.redirect('/semestr?semestr='+sem+blad);
    });
};