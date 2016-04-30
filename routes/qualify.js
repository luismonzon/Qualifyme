/**
 * Created by feer on 29/04/16.
 */
var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res) {
    var profesor = req.query.prof;
    var curso = req.query.curs;
    var link = req.query.id;
    res.render('qualify', { data: {prof: profesor, curs: curso, id: link} });
});

module.exports = router;
