

var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.get('/dodaj/Wydzial', function(req, res){
        res.render('dodaj/wydzial');
    });
    app.post('/dodaj/student', async function (req, res) {
        let imie = req.body.imie;
        let nazwisko = req.body.nazwisko;
        let pesel = req.body.pesel;
        let grupa = req.body.grupa;
        let strona= req.body.strona;
        const sql = 'insert into osoby(imie,nazwisko,pesel,haslo,typ) values(:i,:n,:p,:n,\'Student\')';
        const binds = {
            i: imie,
            n:nazwisko,
            p:pesel
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
            if (err.message.includes('PESEL_UN')){
                blad='&blad=pesel';
            }
            blad+="&imie="+imie+'&nazwisko='+nazwisko+'&pesel='+pesel;
        });
        if (blad===""){
            const sql2 = 'insert into studenci(id,strona_grupy,grupa_id) values((select id from osoby where pesel=:p),:s,:g)';
            const binds2 = {
                p:pesel,
                s:strona,
                g:grupa
            };
            await insertFunctions.insertOne(sql2, binds2, opt);
        }
        res.redirect('/grupa?grupa='+grupa+blad);
    });
};
