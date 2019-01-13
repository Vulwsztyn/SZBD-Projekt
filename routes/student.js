var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/student', async function (req, res) {
        const sql = 'select * from studenci st inner join osoby o on o.id=st.id inner join grupy g on g.id=st.grupa_id left join semestry s on g.semestr_id=s.id left join kierunki k on s.kierunek_id=k.id left join wydzialy w on w.skrot=k.wydzial_id where st.id=:s';
        const binds = {
            s:req.query.student,
        };
        const student = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from semestry where kierunek_id=(select s.kierunek_id from studenci st inner join grupy g on g.id=st.grupa_id inner join semestry s on s.id=g.semestr_id where st.id=:s)';
        const semestry = await selectFun.select(sql2,binds,{});
        res.render('student',{
            student:student.rows[0],
            semestry:semestry
        });
    });
};