scenarioApp.factory('dataRetriever', function($http) {
    var promise = null;
    console.log("nella factory");
    return function(formData) {

        if (formData) {
            promise = $http.post("/data", formData);
        }
        return promise;

    };
});
