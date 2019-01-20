module.exports = function(app){
    require('./zmien/wydzial')(app);
    require('./zmien/kierunek')(app);
    require('./zmien/przedmiot')(app);
    require('./zmien/grupa')(app);
    require('./zmien/student')(app);
};