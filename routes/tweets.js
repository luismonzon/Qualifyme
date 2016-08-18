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


var connection = mysql.createConnection({
  host     : '52.36.161.208',//localhost
  user     : 'feer', //root
  password : 'seminario',//050393
  database : 'Qualifyme_DB'
});


router.get('/user_graph/:user',function(req,res){

  var scor=0;
  connection.query("select avg(sentimiento) score from Tweet t inner join  PROFESOR p on p.ID_PROFESOR=t.ID_PROFESOR  where HASHTAG='"+req.params.user+"'",function(err,rows){
    if (err) throw err;

    //console.log('Data received from Db:\n');
    //console.log(rows);

    scor=rows[0].score;

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify({ score: scor }));
  });
});

router.get('/user_timeline/:user', function(req, res) {

  var data=req.params.user.split(",");
  var oEmbedTweets = [], tweets = [],
      /*
  params = {
    screen_name: req.params.user, // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };


*/
     
      
      params = {
    //q:[ '#'+req.params.user]
    q:[ data[0],data[1]]
  };

  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data
  twitter.get('search/tweets', params, function (err, data, resp) {

    tweets = data;
    //console.log(data);
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

        //console.log('Data received from Db:\n');
        //console.log(rows);
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
