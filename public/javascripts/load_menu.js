/**
 * Created by feer on 29/04/16.
 */
var app = angular.module('Menu', []);


app.controller('myCtrl', ['$scope','$http', function($scope, $http){
    /*$scope.records = [
        {profesor: "Rene Ornelyz", curso: "Estructura de datos", htcurso:"EDD", htprofesor:"ReneOrnelyz"},
        {profesor: "Mario Bautista", curso: "Compiladores 1", htcurso:"COMPI1", htprofesor:"MarioBautista"}
    ]*/
    $scope.prueba = $http.get('/qm_info/data').then(
        function(result) {
            $scope.records = result.data;

        });
}]);


