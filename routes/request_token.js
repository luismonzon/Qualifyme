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
        callback: "http://127.0.0.1:3000/tcallback"
    });
    console.log("hola nenecos");
    var _requestSecret;

    router.get('/', function(req, res) {
        console.log("entnrado..");
        twitter.getRequestToken(function(err, requestToken, requestSecret) {
            if (err)
                res.status(500).send(err);
            else {
                _requestSecret = requestSecret;
                console.log("redireccionando! "+requestToken);
                res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
            }
        });
    });

module.exports = router;