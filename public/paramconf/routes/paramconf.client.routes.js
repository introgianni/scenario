var paramconfApp = angular.module('paramconfApp');
paramconfApp.config(function($routeProvider) {
    $routeProvider.when('/paramconfs', {
        templateUrl: 'paramconf/views/paramconf.html',
        controller: 'paramconfController'
            // css: ['paramconf/css/paramconf.css']
    }).when('/detail', {
        templateUrl: 'paramconf/views/paramconf.html',
        controller: 'paramconfController',
    }).when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    });
});
//for debugging
paramconfApp.run([
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
