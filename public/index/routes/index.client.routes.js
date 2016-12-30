var scenarioApp = angular.module('scenarioApp');
scenarioApp.config(function($routeProvider) {
    //Handle all exceptions
    $routeProvider.when('/', {
        templateUrl: 'home/views/home.html',
        //controller: 'mainController'
    }).
    otherwise({
        redirectTo: '/'
    });
});

//for debugging
scenarioApp.run([
    '$rootScope',
    function($rootScope) {
        // see what's going on when the route tries to change
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            // next is an object that is the route that we are starting to go to
            // current is an object that is the route where we are currently
            if (current !== undefined) {
                var currentPath = current.originalPath;
            }

            if (next !== undefined) {
                var nextPath = next.originalPath;
                var controller = next.controller;
                var templateUrl = next.templateUrl;
            }
        });
    }
]);
