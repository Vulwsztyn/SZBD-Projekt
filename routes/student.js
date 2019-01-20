var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/student', async function (req, res) {
        let blad=(req.query.blad) ? req.query.blad : '';
        let pesel=(req.query.pesel) ? req.query.pesel : "";
        const sql = 'select * from studenci st \n' +
            'inner join osoby o on o.id=st.id \n' +
            'inner join grupy g on g.id=st.grupa_id \n' +
            'left join semestry s on g.semestr_id=s.id \n' +
            'left join kierunki k on s.kierunek_id=k.id \n' +
            'left join wydzialy w on w.id=k.wydzial_id \n' +
            'where st.id=:s';
        const binds = {
            s:req.query.student,
        };
        const student = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from semestry where kierunek_id=(select s.kierunek_id from studenci st inner join grupy g on g.id=st.grupa_id inner join semestry s on s.id=g.semestr_id where st.id=:s)';
        const semestry = await selectFun.select(sql2,binds,{});
        res.render('student',{
            student:student.rows[0],
            semestry:semestry,
            pesel:pesel,
            blad:blad
        });
    });
};