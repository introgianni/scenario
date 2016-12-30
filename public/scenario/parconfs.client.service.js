scenarioApp.service('parconfService', function($http) {
    var getParConf = function(parcod) {
        return $http.get("/api/paramconfs/" + parcod)
            .then(function(response) {
                return response.data;
            });
    };

    return {
        get: getParConf
    };
});
