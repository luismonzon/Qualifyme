var app = angular.module('Twitter', ['ngResource', 'ngSanitize']);



app.controller('myCtrl', function($scope,$resource, $timeout){
    $scope.profesor = htprofesor;
    $scope.curso = htcurso;
    $scope.showMe= false;
    $scope.showFB= false;
    $scope.messageFB="Show";
    $scope.fb_button= false;
    $scope.rate = mirating;
    $scope.Percent = 0;
    $scope.$watch('Percent', function() {
        console.log('hey, myVar has changed!');
    });
    $scope.myFunc = function(){
        $scope.showMe = !$scope.showMe; //oculta o muestra el contenido para rating anonimo
    }
    $scope.sh_fb = function(){
        $scope.showFB = !$scope.showFB;
        if($scope.messageFB == "Show"){
            $scope.messageFB="Hide";
        }else{
            $scope.messageFB="Show";
        }
        console.log($scope.messageFB);
    }
    $scope.sh_fb_button = function(){
        $scope.fb_button=true;
    }

    var params = {
        action: 'user_graph',
        user: htprofesor,
        isArray:false
    };

    $scope.Val = $resource('/tweets/:action/:user', params,{query: {method: 'GET', isArray: false }})
    $scope.Val.query( { }, function (res) {
        //console.log(res.score);
            var object = {
                prof: htprofesor,
                curs: htcurso,
                score: res.score
            }
            socket.emit('MoodBar', object );
             socket.on('SMoodBar',function (data) {
                 $scope.Percent=(data+5)*10;
                 $scope.$apply();
             });
    });



    
});

app.controller('TweetList', function($scope, $resource, $timeout) {

    /**
     * init controller and set defaults
     */
    function init () {

        // set a default username value
        $scope.username = $scope.username = "#"+local_data.prof+",#"+local_data.curs;
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