var updateFunctions = require ('../../connections/insert');

module.exports = function(app){

    app.post('/zmien/godziny/rozpoczecia', async function (req, res) {
        let g = req.body.g;
        let sql ="update godziny_zajec set godz_roz=:h, min_roz=:m where numer=:n";
        let binds = {
            h: req.body.h,
            m: req.body.m,
            n: req.body.n
        };

        const opt = {
            autoCommit: true,
        };

            await updateFunctions.insertOne(sql, binds, opt);



        res.redirect('/godziny');
    });
    app.post('/zmien/godziny/zakonczenia', async function (req, res) {
        let g = req.body.g;
        let sql ="update godziny_zajec set godz_zak=:h, min_zak=:m where numer=:n";
        let binds = {
            h: req.body.h,
            m: req.body.m,
            n: req.body.n
        };

        const opt = {
            autoCommit: true,
        };

        await updateFunctions.insertOne(sql, binds, opt);

        res.redirect('/godziny');
    });
};