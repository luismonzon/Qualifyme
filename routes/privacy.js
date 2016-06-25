/**
 * Created by feer on 25/06/16.
 */
var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res) {
    res.render('privacy', { title: 'Qualifyme Privacy' });
});

module.exports = router;
