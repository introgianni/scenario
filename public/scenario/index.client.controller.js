scenarioApp.controller('IndexController', function IndexController($scope, $translate) {

    // Assiociato alle bandiere di cambio lingua
    $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
        setButtonGlow(langKey);
    };

    // Funzione per aggiungere il bordo al pulsante di lingua selezionato
    var setButtonGlow = function(langKey) {
        var listaBottoniAttivi = angular.element(".glowing-border-button");
        if (listaBottoniAttivi && listaBottoniAttivi.length > 0) {
            var arrayLength = listaBottoniAttivi.length;
            for (var i = 0; i < arrayLength; i++) {
                listaBottoniAttivi[i].classList.remove("glowing-border-button");
            }
        }
        var bottoneDaAttivare = angular.element("#" + langKey + "Button");
        if (bottoneDaAttivare) {
            bottoneDaAttivare.addClass("glowing-border-button");
        }
    };
    setButtonGlow("it");

});
