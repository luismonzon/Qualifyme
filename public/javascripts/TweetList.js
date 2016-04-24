var app = angular.module('Twitter', ['ngResource', 'ngSanitize']);



app.controller('myCtrl', function($scope,$resource, $timeout){
    $scope.profesor = htprofesor;
    $scope.curso = htcurso;
    $scope.showMe= false;
    $scope.myFunc = function(){
        $scope.showMe = !$scope.showMe;
    }

    var params = {
        action: 'user_graph',
        user: htprofesor,
        isArray:false
    };

    $scope.Val = $resource('/tweets/:action/:user', params,{query: {method: 'GET', isArray: false }})
    $scope.Val.query( { }, function (res) {
        console.log(res.score);


            $scope.Percent=(res.score+5)*10;


    });



});

app.controller('TweetList', function($scope, $resource, $timeout) {

    /**
     * init controller and set defaults
     */
    function init () {

        // set a default username value
        $scope.username = "#ReneOrnelyz,#EDD";
        //$scope.username = htcurso + '#'+htprofesor;//Debe buscar ambos ht. Esto es solo para probar
        // empty tweet model
        $scope.tweetsResult = [];

        // initiate masonry.js
        $scope.msnry = new Masonry('#tweet-list', {
            columnWidth: 320,
            itemSelector: '.tweet-item',
            transitionDuration: 0,
            isFitWidth: true
        });

        // layout masonry.js on widgets.js loaded event
        twttr.events.bind('loaded', function () {
            $scope.msnry.reloadItems();
            $scope.msnry.layout();
        });

        $scope.getTweets();
    }

    /**
     * requests and processes tweet data
     */
    
    
    
    function getTweets (paging) {

        var params = {
            action: 'user_timeline',
            user: $scope.username
        };

        if ($scope.maxId) {
            params.max_id = $scope.maxId;
        }

        // create Tweet data resource
        $scope.tweets = $resource('/tweets/:action/:user', params);

        // GET request using the resource
        $scope.tweets.query( { }, function (res) {

            if( angular.isUndefined(paging) ) {
                $scope.tweetsResult = [];
            }


            $scope.tweetsResult = $scope.tweetsResult.concat(res);

            // for paging - https://dev.twitter.com/docs/working-with-timelines
            $scope.maxId = res[res.length - 1].id;

            // render tweets with widgets.js
            $timeout(function () {
                twttr.widgets.load();
            }, 30);
        });
    }

    /**
     * binded to @user input form
     */
    $scope.getTweets = function () {
        $scope.maxId = undefined;
        getTweets();
    }

    /**
     * binded to 'Get More Tweets' button
     */
    $scope.getMoreTweets = function () {
        
        getTweets(true);
    }

    init();
});