angular.module('ifiske.controllers')
.controller('AreaDetailCtrl', ['$scope', 'API','$stateParams', 'DB', function($scope, API, $stateParams, DB) {
    DB.getArea($stateParams.id)
    .then(function(data) {
        $scope.area = data;
        $scope.area.img = 'img/test.jpg';
    }, function(err) {
        console.log(err);
    });
}]);
