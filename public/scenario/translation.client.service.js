scenarioApp.config(['$translateProvider', function($translateProvider) {
    // Traduzioni per la lingua italiana
    var ita = {
        "view.index.menu.scenario": "SCENARIO DIDATTICO",
        "view.index.menu.itbutton": "Italiano",
        "view.index.menu.enbutton": "Inglese",
        "view.index.menu.logo": "Logo Università",
        "view.index.menu.configurazione": "Configurazione",
        "view.index.menu.accessibile": "Versione Accessibile",
        "view.index.menu.info": "Informazioni",
        "view.index.menu.dipartimenti": "DIPARTIMENTI",
        "view.index.menu.configura": "CONFIGURA",

        "view.index.menu.item.scenario": "Scenario Didattico",
        "view.index.menu.item.corsi": "Corsi",
        "view.index.menu.item.dipartimenti": "Dipartimenti",
        "view.index.menu.item.attivita": "Attività Formative",
        "view.index.menu.item.parametri": "Parametri ",

        "view.scenario.search.struttura": "Struttura",
        "view.scenario.search.anno": "Anno",
        "view.scenario.search.corso": "Tipo Corso",
        "view.scenario.search.cerca": "Cerca",
        "view.scenario.search.dataagg": "Aggiornato il",
        "view.scenario.search.newsearch": "Nuova Ricerca",
        "view.scenario.right.about": "Info",
        "view.scenario.right.dettagli": "Dettagli",
        "view.scenario.right.proped": "Propedeuticità",
        "view.scenario.right.legenda": "Legenda",

        "view.accessiblile.search.testata": "Ricerca Scenario Didattico",
        "view.accessiblile.search.searched": "Ricerca Attuale",
        "view.accessiblile.data.url": "Sito Web",
        "view.accessiblile.data.percorsi": "Percorsi possibili",
        "view.accessiblile.data.cfu": "CFU",
        "view.accessiblile.data.codice": "Codice Attività",
        "view.accessiblile.data.notapre": "Nota Pre",
        "view.accessiblile.data.notapost": "Nota Post",
        "view.accessiblile.breadcrumb.dove": "Percorso"

    };

    $translateProvider.translations('it', ita);
    // Dove recuperare gli altri file di traduzione e come si chiamano
    $translateProvider.useStaticFilesLoader({
        prefix: '../i18n/',
        suffix: '.json'
    });
    // Specifico qual'è il linguaggio di default se non si trova una chiave
    $translateProvider.fallbackLanguage('it');
    $translateProvider.preferredLanguage('it');
    $translateProvider.useSanitizeValueStrategy('escape');
}]);
