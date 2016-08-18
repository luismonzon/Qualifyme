var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host     : '52.36.161.208',//localhost
    user     : 'feer', //root
    password : 'seminario',//050393
    database : 'Qualifyme_DB'
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('profesor', { title: 'Qualifyme Twitter' });
});


router.post('/save',function (req, res) {

    console.log('in save');


    var myQuery= "UPDATE PROFESOR set NOMBRE= '"+req.body.NOMBRE+"', APELLIDO='"+req.body.APELLIDO+"', HASHTAG='"+req.body.HASHTAG+"' where ID_PROFESOR="+req.body.ID_PROFESOR+"; ";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
        });

});


router.post('/create',function (req, res) {

    console.log('in create');


    var myQuery= "insert into PROFESOR (NOMBRE,APELLIDO,HASHTAG,TIPO) values('"+req.body.NOMBRE+"', '"+req.body.APELLIDO+"', '"+req.body.HASHTAG+"', 1)";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;


        res.send(results);

    });

});

router.post('/delete',function (req, res) {

    console.log('in delete');


    var myQuery= "delete from PROFESOR where ID_PROFESOR = "+req.body.ID_PROFESOR;
    connection.query(myQuery, function(err, results) {
        if (err) throw err;

        res.send(results);

    });

});


router.get('/show',function (req, res) {
    console.log('in--in');

    var myQuery= "select * from PROFESOR order by ID_PROFESOR";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
    });
});

module.exports = router;
