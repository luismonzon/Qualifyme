var express = require('express');
var router = express.Router();
var Twit = require('twit');
var config = require('../config');
var sentiment = require('sentiment-spanish');
var mysql= require('mysql');
var phpdate = require('phpdate-js');
var gmdate = require('phpdate-js').gmdate;
// instantiate Twit module
var twitter = new Twit(config.twitter);

var TWEET_COUNT = 15;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';

/**
 * GET tweets json.
 */

router.get('/user_timeline/:user', function(req, res) {

  var connection = mysql.createConnection({
    host     : '52.38.100.153',//localhost
    user     : 'myuser', //root
    password : 'seminario',//050393
    database : 'Qualifyme_DB'
  });
  var oEmbedTweets = [], tweets = [],
/*
  params = {
    screen_name: req.params.user, // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };
*/params = {
    //q:[ '#'+req.params.user]
    q:[ '#ReneOrnelyz','#EDD']
  };

  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data
  twitter.get('search/tweets', params, function (err, data, resp) {

    tweets = data;
    console.log(data);
    var i = 0, len = tweets.statuses.length;
    for(i; i < len; i++) {
      getSentiment(tweets.statuses[i].text,tweets.statuses[i].entities.hashtags,tweets.statuses[i].id,tweets.statuses[i].created_at);
      getOEmbed(tweets.statuses[i]);
    }
  });


  /**
   * requests the oEmbed html
   */

  function getSentiment(data,hashtags,id,fecha){

    var r1= sentiment(data, {
      'no':-1
    });

    var datetwit = gmdate('Y-m-d H:i:s T', fecha);

    if(hashtags.length==2){

      var hash1= hashtags[0].text;
      var hash2= hashtags[1].text;

      connection.query("CALL insertTweet("+id+",'"+data+"','"+datetwit+"','"+hash1+"','"+hash2+"','"+r1.score+"')",function(err,rows){
        if (err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows);
      });

    }
  }

  function getOEmbed (tweet) {

    // oEmbed request params
    var params = {
      "id": tweet.id_str,
      "maxwidth": MAX_WIDTH,
      "hide_thread": true,
      "omit_script": true
    };

    // request data 
    twitter.get(OEMBED_URL, params, function (err, data, resp) {
      tweet.oEmbed = data;
      oEmbedTweets.push(tweet);

      // do we have oEmbed HTML for all Tweets?
      if (oEmbedTweets.length == tweets.statuses.length) {

        res.setHeader('Content-Type', 'application/json');
        res.send(oEmbedTweets);
      }
    });
  }
});

module.exports = router;
