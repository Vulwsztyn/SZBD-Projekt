module.exports = function(app){
    require('./wyswietl/oceny')(app);
    require('./wyswietl/plan')(app);
    require('./wyswietl/studenci')(app);
    require('./wyswietl/student')(app);
};