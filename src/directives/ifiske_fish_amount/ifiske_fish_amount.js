angular.module('ifiske.directives')
.directive('ifiskeFishAmount', function() {
    return {
        restrict:    'E',
        transclude:  false,
        templateUrl: 'directives/ifiske_fish_amount/ifiske_fish_amount.html',

        scope: {
            fishId: '=',
            amount: '=',
        },
        controller: function($scope, Fish, $rootScope) {
            $scope.image_endpoint = $rootScope.image_endpoint;
            $scope.$watch('fishId', id => {
                console.log(id);
                Fish.getOne(id).then(fish => {
                    $scope.fish = fish;
                });
            });
        },
    };
});