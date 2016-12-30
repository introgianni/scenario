scenarioApp.controller('ScenarioController', function ScenarioController($scope, $http, $timeout,
    dataRetriever, ateneiService, parconfService, drawGraphService) {

    $scope.showFormRicerca = true;
    $scope.showParametriRicerca = false;

    var DR_AA_COORTE_SCEN_DID, NUM_ANNI_COORTE_SCEN_DID;

    var onFetchError = function(message) {
        $scope.error = "Error Fetching Atenei. Message:" + message;
    };

    var popolaDatiAteneo = function(data) {
        console.log("carico i dipartimenti");
        if (data) {
            $scope.dipartimenti = data[0].dipartimenti;
            $scope.tipiCorso = data[0].tipiCorso;
            var parConfs = data[0].parConfs;
            if (parConfs) {
                var size = parConfs.length;
                for (var index = 0; index < size; index++) {
                    if (parConfs[index].param.cod === 'DR_AA_COORTE_SCEN_DID') {
                        DR_AA_COORTE_SCEN_DID = parConfs[index].val;
                    }
                    if (parConfs[index].param.cod === 'NUM_ANNI_COORTE_SCEN_DID') {
                        NUM_ANNI_COORTE_SCEN_DID = parConfs[index].val;
                    }
                }
            }
            console.log("DR_AA_COORTE_SCEN_DID = " + DR_AA_COORTE_SCEN_DID);
            console.log("NUM_ANNI_COORTE_SCEN_DID = " + NUM_ANNI_COORTE_SCEN_DID);
            var loadParConf = [];
            if (!DR_AA_COORTE_SCEN_DID) {
                loadParConf[0] = "DR_AA_COORTE_SCEN_DID";
            }
            if (!NUM_ANNI_COORTE_SCEN_DID) {
                loadParConf[0] = "NUM_ANNI_COORTE_SCEN_DID";
            }
            if (loadParConf.length > 0) {
                getParConf(loadParConf);
            }
            creaTendinaAnni(DR_AA_COORTE_SCEN_DID, NUM_ANNI_COORTE_SCEN_DID);
        }
    };

    var creaTendinaAnni = function(annoInizo, numAnni) {
        var listaAnni = [];
        var annoInizio;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var dataDDMMArray = annoInizo.split("/");
        if (parseInt(dataDDMMArray[1]) > mm) {
            annoInizio = yyyy - 1;
        } else {
            if (parseInt(dataDDMMArray[1]) === mm && parseInt(dataDDMMArray[1]) > dd) {
                annoInizio = yyyy - 1;
            } else {
                annoInizio = yyyy;
            }
        }
        for (var index = 0; index < numAnni; index++) {
            var anno = {
                cod: annoInizio - index,
                des: String(annoInizio - index) + "/" + String(annoInizio - index + 1)
            };
            listaAnni[index] = anno;
        }
        $scope.listaAnni = listaAnni;
    };

    var popolaParConf = function(data) {
        console.log("valorizzo i parConf");
        if (data[0]) {
            if (data[0].cod === 'DR_AA_COORTE_SCEN_DID') {
                DR_AA_COORTE_SCEN_DID = data[0].default;
            }
            if (data[0].cod === 'NUM_ANNI_COORTE_SCEN_DID') {
                NUM_ANNI_COORTE_SCEN_DID = data[0].default;
            }
            creaTendinaAnni(DR_AA_COORTE_SCEN_DID, NUM_ANNI_COORTE_SCEN_DID);
        };
    };

    var getAtenei = function(cod) {
        ateneiService.get(cod).then(popolaDatiAteneo, onFetchError);
    };

    var getParConf = function(listaParConf) {
        var len = listaParConf.length;
        for (var index = 0; index < len; index++) {
            // TODO: farlo girare con una lista X di parConf
            parconfService.get(listaParConf[index]).then(popolaParConf, onFetchError);
        }
    };

    getAtenei("UNITO");

    var dataPostSuccessCallback = function(res) {
        console.log("Successo nel ricevere il json dei dati");
        if (res.data.updated_at && res.data.updated_at.length > 10) {
            $scope.dataagg = res.data.updated_at.substring(0, 10);
        }
        drawGraphService.draw(res.data.rawJson);
    };

    var dataPostErrorCallback = function(res) {
        console.log("Errore nel ricevere il json dei dati");
        $scope.error = "Error Fetching Data. Message:" + res;
    };

    $scope.submitData = function(formData) {
        if (!formData || !formData.dipartimento || !formData.anno || !formData.corso) {
            alert("Errore, inserire tutti i criteri di ricerca");
            return;
        }
        $scope.showParametriRicerca = true;
        $scope.showFormRicerca = false;
        dataRetriever(formData).then(dataPostSuccessCallback, dataPostErrorCallback)
    };


});
