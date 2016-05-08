/**
 * Created by feer on 29/04/16.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/data',function (req, res) {

    var connection = mysql.createConnection({
        host     : '52.36.161.208',//localhost
        user     : 'myuser', //root
        password : 'seminario',//050393
        database : 'Qualifyme_DB'
    });

    var myQuery= "SELECT p.HASHTAG as htp, c.HASHTAG as htc, po.ID_ORIGINAL as ID, p.NOMBRE as pn, p.APELLIDO as an,c.NOMBRE as cn " +
        "from PROFESOR p, CURSO c, POST po, ASIGNACION a " +
        "where  a.PID_PROFESOR = p.ID_PROFESOR and a.PID_CURSO = c.ID_CURSO and a.PID_POST = po.ID_POST";
    connection.query(myQuery, function(err, results) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        console.log(results);
        res.send(results);
    });
});

module.exports = router;