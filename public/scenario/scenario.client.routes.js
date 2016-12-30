scenarioApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/Scenario', {
                templateUrl: 'scenario/scenario.html',
                controller: 'ScenarioController',
                controllerAs: 'ScenarioController'
            }).when('/Accessibile/', {
                templateUrl: 'scenario/accessibile.html',
                controller: 'AccessController',
                controllerAs: 'AccessController'
            });
    }
])


/*
.when('/Config/', {
    templateUrl: 'scenario/config.html',
    controller: 'ConfigController',
    controllerAs: 'ConfigController'
}).when('/Accessibile/', {
    templateUrl: 'scenario/accessibile.html',
    controller: 'AccessController',
    controllerAs: 'AccessController'
}).when('/Accessibile/:nodeId', {
    templateUrl: 'scenario/accessibileTemplate.html',
    controller: 'AccessController',
    controllerAs: 'AccessController'
}).when('/About/', {
    templateUrl: 'scenario/about.html',
    controller: 'AboutController',
    controllerAs: 'AboutController'
}) */
