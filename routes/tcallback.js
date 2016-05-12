/**
 * Created by feer on 8/05/16.
 */
var express = require('express');
var router = express.Router();
var Twitter = require("node-twitter-api"),
    secret = require("secret");

    var twitter = new Twitter({
        consumerKey: "0t4l1BJZWPg5bMDY7epCXLwFy",
        consumerSecret: "cnRB03gXg2Vs77t4qdfiHvQBM6ch7oPOx45Od2UQ1fZNSBjsj4",
        callback: "http://qualifymegt.com/tcallback"
    });

    var _requestSecret;

    router.get('/', function(req, res) {
        var requestToken = req.query.oauth_token,
            verifier = req.query.oauth_verifier;

        twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
            if (err)
                res.status(500).send(err);
            else
                twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.redirect("http://qualifymegt.com/menu");

                });
        });
    });

module.exports = router;
