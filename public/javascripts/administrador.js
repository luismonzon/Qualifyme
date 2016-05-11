var app = angular.module('app', []);

app.controller('Ctrl', ['$scope','$http', function($scope,$http){

    var nombre;
    var hashtag;
    var apellido;
    var codigo;
    var edit=false;
    $scope.tabelsData='';

    $scope.prueba = $http.get('/profesor/show').then(
        function(result) {

            $scope.tabelsData=result.data;
            console.log($scope.tabelsData);


            $scope.editingData = {};

            for (var i = 0, length = $scope.tabelsData.length; i < length; i++) {
                $scope.editingData[$scope.tabelsData[i].ID_PROFESOR] = false;
            }

        });



    $scope.modify = function(tableData){
        nombre=tableData.NOMBRE;
        $scope.editingData[tableData.ID_PROFESOR] = true;
        edit=true;
    };

    $scope.cancel = function(tableData){
        $scope.editingData[tableData.ID_PROFESOR] = false;
    }

    $scope.delete=function (tableData) {

        for (var i = 0; i < $scope.tabelsData.length; i++) {
            if ($scope.tabelsData[i].ID_PROFESOR == tableData.ID_PROFESOR) {

                var parameter = JSON.stringify({ID_PROFESOR: tableData.ID_PROFESOR});

                $http.post('/profesor/delete', parameter).success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.tabelsData.splice(i, 1);
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

                break;
            }

        }
    }

    $scope.add= function () {

        edit=false;
        var pos =getMax($scope.tabelsData,'ID_PROFESOR').ID_PROFESOR+1;
        $scope.tabelsData.push({ID_PROFESOR: pos,NOMBRE:'',APELLIDO:'', HASHTAG:''});
        $scope.editingData[pos]= true;

    }


    function getMax(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }

    $scope.update = function(tableData){


        $scope.editingData[tableData.ID_PROFESOR] = false;
        var parameter = JSON.stringify({ID_PROFESOR:tableData.ID_PROFESOR, NOMBRE:tableData.NOMBRE, HASHTAG:tableData.HASHTAG, APELLIDO: tableData.APELLIDO});

        if(edit==true){

        $http.post('/profesor/save', parameter).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(data);
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        }else{
            $http.post('/profesor/create', parameter).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.editingData[data.ID_PROFESOR] = false;

                console.log(data);

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }
    };

}]);




app.controller('Cursos', ['$scope','$http', function($scope,$http){

    var edit=false;
    $scope.tabelsData='';

    $scope.prueba = $http.get('/curso/show').then(
        function(result) {

            $scope.tabelsData=result.data;
            console.log($scope.tabelsData);


            $scope.editingData = {};

            for (var i = 0, length = $scope.tabelsData.length; i < length; i++) {
                $scope.editingData[$scope.tabelsData[i].ID_CURSO] = false;
            }

        });



    $scope.modify = function(tableData){
        nombre=tableData.NOMBRE;
        $scope.editingData[tableData.ID_CURSO] = true;
        edit=true;
    };

    $scope.cancel = function(tableData){
        $scope.editingData[tableData.ID_CURSO] = false;
    }

    $scope.delete=function (tableData) {

        for (var i = 0; i < $scope.tabelsData.length; i++) {
            if ($scope.tabelsData[i].ID_CURSO == tableData.ID_CURSO) {

                var parameter = JSON.stringify({ID_CURSO: tableData.ID_CURSO});

                $http.post('/curso/delete', parameter).success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.tabelsData.splice(i, 1);
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

                break;
            }

        }
    }

    $scope.add= function () {

        edit=false;
        var pos =getMax($scope.tabelsData,'ID_CURSO').ID_CURSO+1;
        $scope.tabelsData.push({ID_CURSO: pos,NOMBRE:'', HASHTAG:''});
        $scope.editingData[pos]= true;

    }


    function getMax(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }

    $scope.update = function(tableData){


        $scope.editingData[tableData.ID_CURSO] = false;

        var parameter = JSON.stringify({ID_CURSO:tableData.ID_CURSO, NOMBRE:tableData.NOMBRE, HASHTAG:tableData.HASHTAG});

        if(edit==true){

            $http.post('/curso/save', parameter).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }else{
            $http.post('/curso/create', parameter).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.editingData[data.ID_CURSO] = false;

                console.log(data);

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }
    };

}]);





app.controller('Asignacion', ['$scope','$http', function($scope,$http){


    $scope.prueba = $http.get('/asignacion/getcurso').then(
        function(result) {
            console.log(result.data);

            $scope.data_curso={repeatSelect: null, availableOptions: {}}
            $scope.data_curso.availableOptions=result.data;
            console.log($scope.data_curso);
        });
    
    $scope.prueba = $http.get('/asignacion/getprofesor').then(
        function(result) {


            $scope.data_prof={repeatSelect: null, availableOptions: {}}
            $scope.data_prof.availableOptions=result.data;
            console.log($scope.data_prof);
        });


    var edit=false;
    $scope.tabelsData='';

    $scope.prueba = $http.get('/asignacion/show').then(
        function(result) {
            $scope.tabelsData=result.data;
            console.log($scope.tabelsData);
            $scope.editingData = {};

            for (var i = 0, length = $scope.tabelsData.length; i < length; i++) {
                $scope.editingData[$scope.tabelsData[i].PID_CURSO+$scope.tabelsData[i].PID_PROFESOR] = false;
            }

        });


    $scope.modify = function(tableData,index){
        console.log(index);
        $scope.editingData[index] = true;
        edit=true;
    };

    $scope.cancel = function(tableData){
        $scope.editingData[tableData.ID_CURSO] = false;
    }

    $scope.delete=function (tableData) {

        for (var i = 0; i < $scope.tabelsData.length; i++) {
            if ($scope.tabelsData[i].PID_CURSO == tableData.PID_CURSO && $scope.tabelsData[i].PID_PROFESOR==tableData.PID_PROFESOR ) {

                var parameter = JSON.stringify({PID_CURSO: tableData.PID_CURSO, PID_PROFESOR: tableData.PID_PROFESOR});

                $http.post('/asignacion/delete', parameter).success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.tabelsData.splice(i, 1);
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

                break;
            }

        }
    }

    $scope.add= function () {

        edit=false;
        var pos =$scope.tabelsData.length;
        $scope.tabelsData.push({HTPROF:'',PID_PROFESOR:'',PID_CURSO: '',NCURSO:'', HTCURSO:''});
        console.log(pos);
        $scope.editingData[pos]= true;

    }


    function getMax(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }

    $scope.update = function(tableData){


        $scope.editingData[tableData.ID_CURSO] = false;

        var parameter = JSON.stringify({HTCURSO: tableData.HTCURSO, HTPROF:tableData.HTPROF});

        if(edit==true){

            $http.post('/asignacion/save', parameter).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }else{
            $http.post('/asignacion/create', parameter).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.editingData[$scope.tabelsData.length] = false;
                
                console.log(data);

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }
    };

}]);
