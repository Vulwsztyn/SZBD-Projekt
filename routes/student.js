var selectFun = require ('../connections/select');
module.exports = function(app){
    app.get('/student', async function (req, res) {
        let blad=(req.query.blad) ? req.query.blad : '';
        let pesel=(req.query.pesel) ? req.query.pesel : "";
        const sql = 'select * from studenci st inner join osoby o on o.id=st.id inner join grupy g on g.id=st.grupa_id left join semestry s on g.semestr_id=s.id left join kierunki k on s.kierunek_id=k.id left join wydzialy w on w.id=k.wydzial_id where st.id=:s';
        const binds = {
            s:req.query.student,
        };
        const student = await selectFun.select(sql,binds,{});
        const sql2 = 'select * from semestry where kierunek_id=(select s.kierunek_id from studenci st inner join grupy g on g.id=st.grupa_id inner join semestry s on s.id=g.semestr_id where st.id=:s)';
        const semestry = await selectFun.select(sql2,binds,{});
        const sql3 = 'select * from grupy where semestr_id in (select semestr_id from grupy where id=(select grupa_id from studenci where id=:s))';
        const grupy = await selectFun.select(sql3,binds,{});
        res.render('student',{
            student:student.rows[0],
            semestry:semestry,
            pesel:pesel,
            blad:blad,
            grupy:grupy.rows
        });
    });
};