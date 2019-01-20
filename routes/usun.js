module.exports = function(app){
    require('./usun/grupa')(app);
    require('./usun/kierunek')(app);
    // require('./usun/ocena')(app);
    // require('./usun/pracownik')(app);
    require('./usun/przedmiot')(app);
    require('./usun/student')(app);
    require('./usun/wydzial')(app);
    // require('./usun/zespol')(app);
};