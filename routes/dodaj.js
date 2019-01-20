module.exports = function(app){
    require('./dodaj/wydzial')(app);
    require('./dodaj/kierunek')(app);
    require('./dodaj/grupy')(app);
    require('./dodaj/przedmioty')(app);
    require('./dodaj/plan')(app);
    require('./dodaj/oceny')(app);
    require('./dodaj/student')(app);
};