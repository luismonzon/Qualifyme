var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host     : '52.36.161.208',//localhost
    user     : 'myuser', //root
    password : 'seminario',//050393
    database : 'Qualifyme_DB'
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('asignacion', { title: 'Qualifyme Twitter' });
});


router.post('/save',function (req, res) {

    console.log('in save');


    var myQuery= "UPDATE CURSO set NOMBRE= '"+req.body.NOMBRE+"',  HASHTAG='"+req.body.HASHTAG+"' where ID_CURSO="+req.body.ID_CURSO+"; ";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
    });

});


router.post('/create',function (req, res) {

    console.log('in create');
    console.log(req);

//aqui creamos el post
    /*
    var myQuery= "INSERT INTO ASIGNACION (PID_CURSO,PID_PROFESOR,PID_POST)"+
    "SELECT ID_CURSO, ID_PROFESOR , 'aca pone tu id del post' as PID_POST from CURSO as C, PROFESOR as P where  C.HASHTAG= '"+req.body.HTCURSO+"' and P.HASHTAG= '"+req.body.HTPROF+"'";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;


        res.send(results);

    });*/

});

router.post('/delete',function (req, res) {

    console.log('in delete');


    var myQuery= "delete from ASIGNACION where PID_CURSO = "+req.body.PID_CURSO+" and  PID_PROFESOR="+req.body.PID_PROFESOR;
    connection.query(myQuery, function(err, results) {
        if (err) throw err;

        res.send(results);

    });

});


router.get('/show',function (req, res) {
    console.log('in--in');

    var myQuery= "SELECT PID_PROFESOR, P.NOMBRE as NPROF,P.APELLIDO,P.HASHTAG as HTPROF,PID_CURSO, C.NOMBRE as NCURSO, C.HASHTAG as HTCURSO "+
    "FROM Qualifyme_DB.ASIGNACION as A inner Join PROFESOR as P on P.ID_PROFESOR= A.PID_PROFESOR"+
    " inner join CURSO C on C.ID_CURSO=A.PID_PROFESOR;";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
    });
});

router.get('/getprofesor',function (req, res) {
    console.log('in--in');

    var myQuery= "select * from PROFESOR";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
    });
});

router.get('/getcurso',function (req, res) {
    console.log('in--in');

    var myQuery= "SELECT * from CURSO";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
    });
});
module.exports = router;
