'use strict';

// configure Index Routes

//var scenarioApp = angular.module('scenarioApp', ['paramconfApp', 'ngRoute']);

var scenarioApp = angular.module('scenarioApp', ['paramconfApp', 'pascalprecht.translate', 'ngAnimate', 'ngRoute']);
scenarioApp.run(function($rootScope) {
    $rootScope.appVersion = "0.1";
});
