/**
 * Created by feer on 29/04/16.
 */
var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res) {
    res.render('menu', { title: 'Qualifyme Menu' });
});

module.exports = router;
