scenarioApp.service('paramconfService', function($http) {


    var updateParamconf = function(newParamconf) {
      return  $http.put('/api/paramconfs', newParamconf)
            .then(function(paramconfUpdated) {
                return paramconfUpdated;
            }).catch(function onError(err) {
                console.log("Errore: ", err);
                throw err;
            });
    };

    return {
        updateParamconf: updateParamconf
    };
});
