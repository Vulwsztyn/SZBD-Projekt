module.exports = function(app){
    require('./dodaj/wydzial')(app);
    require('./dodaj/kierunek')(app);
    require('./dodaj/grupy')(app);
};