

var insertFunctions = require ('../../connections/insert');

module.exports = function(app){
    app.post('/dodaj/pracownik', async function (req, res) {
        let imie = req.body.imie;
        let nazwisko = req.body.nazwisko;
        let pesel = req.body.pesel;
        let zespol = req.body.zespol;
        let tytul= req.body.tytul;
        // console.log(imie);
        // console.log(nazwisko);
        // console.log(pesel);
        // console.log(zespol);
        // console.log(tytul);
        const sql = 'insert into osoby(imie,nazwisko,pesel,haslo,typ) values(:i,:n,:p,:n,\'Teacher\')';
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
            blad+="&imie="+imie+'&nazwisko='+nazwisko+'&pesel='+pesel+"&tytul="+tytul;
        });
        if (blad===""){
            const sql2 = 'insert into pracownicy(id,stopien,zespol_id) values((select id from osoby where pesel=:p),:s,:z)';
            const binds2 = {
                p:pesel,
                s:tytul,
                z:zespol
            };
            await insertFunctions.insertOne(sql2, binds2, opt);
        }
        res.redirect('/zespol?zespol='+zespol+blad);
    });
};
