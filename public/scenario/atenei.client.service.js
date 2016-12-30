scenarioApp.service('ateneiService', function($http) {
    var getAtenei = function(ateCod) {
        return $http.get("/api/atenei/" + ateCod)
            .then(function(response) {
                return response.data;
            });
    };

    return {
        get: getAtenei
    };
});
