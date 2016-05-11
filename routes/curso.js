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
    res.render('curso', { title: 'Qualifyme Twitter' });
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


    var myQuery= "insert into CURSO (NOMBRE,HASHTAG) values('"+req.body.NOMBRE+"', '"+req.body.HASHTAG+"')";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;


        res.send(results);

    });

});

router.post('/delete',function (req, res) {

    console.log('in delete');


    var myQuery= "delete from CURSO where ID_CURSO = "+req.body.ID_CURSO;
    connection.query(myQuery, function(err, results) {
        if (err) throw err;

        res.send(results);

    });

});


router.get('/show',function (req, res) {
    console.log('in--in');

    var myQuery= "select * from CURSO order by ID_CURSO";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
    });
});

module.exports = router;
