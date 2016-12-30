var paramconfApp = angular.module('paramconfApp');
var paramconfController = paramconfApp.controller('paramconfController', function($scope, $http,
    $cookieStore, paramconfService, $q, uiGridConstants, $window, $timeout) {
    var screenWidth = $window.innerWidth;

    $scope.gridParamconf = {
        enableColumnResizing: true,
        rowEditWaitInterval: 3000,
        enableCellEditOnFocus: true,
        enableGridMenu: true,
        enableRowSelection: true,
        enableSelectAll: true,
        enableFiltering: true,
        multiSelect: true,
        enableHorizontalScrollbar: 1,
        enableVerticalScrollbar: 0,
        rowHeight: 40,
        // enablePaginationControls: false,
        minRowsToShow: 17,
        virtualizationThreshold: 15,
        paginationPageSizes: [30, 45, 60],
        paginationPageSize: 15,
        columnDefs: [{
            field: 'cod',
            displayName: 'Name',
            width: '20%',
            minWidth: 100,
        }, {
            field: 'des',
            displayName: 'Descrizione',
            width: '20%',
            minWidth: 100,
        }, {
            field: 'default',
            displayName: 'Valore',
            width: '20%',
            minWidth: 100,
        }, {
            field: 'attinenza',
            displayName: 'Attinenza',
            width: '13%',
            minWidth: 100,
            filter: {
                type: uiGridConstants.filter.SELECT,
                selectOptions: [{
                    value: 'CONF_SYS',
                    label: 'CONF_SYS'
                }, {
                    value: 'OF',
                    label: 'OF'
                }]
            }
        }, {
            name: 'updated_at',
            displayName: 'Modificato',
            type: 'date',
            cellFilter: 'date:"dd-MM-yyyy"',
            width: '20%',
            minWidth: 100,

        }, {
            width: '4%',
            minWidth: 50,
            enableHiding: false,
            enableColumnMenu: false,
            enableColumnResizing: false,
            enableSorting: false,
            enableFiltering: false,
            /* beautify preserve:start */
            name: 'Azioni',
            displayName: '',
            cellTemplate: '<div class="btn-group btn-group-xs"><button type="button" class="btn btn-danger" title="Elimina" ng-click="grid.appScope.deleteParamconfUIGrid(row)"><span class="glyphicon glyphicon-trash"></span></button></div>'/* beautify preserve:end */
        }]
    };


    //non più usato dopo aggiunta UIgrid
    $scope.addNewParamconf = function() {
        $http.post('/api/paramconfs', $scope.newParamconf)
            .success(function(data) {
                $scope.paramconfs.push(data);
                $scope.newParamconf = {};
            }).catch(function onError(err) {
                console.log(err);
                throw err;
            });
    };


    $scope.updateParamconf = function() {
        paramconfService.updateParamconf($scope.newParamconf).then(function(paramconfUpdated) {
            $scope.newParamconf = paramconfUpdated;
        }).catch(function(err) {
            console.log(err);
        });
    };


    $scope.deleteParamconf = function(index) {
        var paramconfCod = $scope.paramconfs[index].cod;
        $http.delete('/api/paramconfs/' + paramconfCod).success(function(data) {
                $scope.paramconfs.splice(index, 1);
            })
            .error(function(err) {
                alert('Error deleteParamconf');
            });
    };

    $scope.deleteParamconfUIGrid = function(row) {
        var data = $scope.gridParamconf.data;
        var index = data.indexOf(row.entity);
        var paramconfCod = row.entity.cod;
        $scope.gridParamconf.data.splice(index, 1);

        $http.delete('/api/paramconfs/' + paramconfCod).success(function(data) {
                $scope.paramconfs.splice(index, 1);
            })
            .error(function(err) {
                alert('Error deleteParamconf');
            });
    };

    $scope.deleteAllgridParamconf = function() {
        var selection = $scope.gridApi.selection;
        var count = selection.getSelectedCount();
        var rowsGrid = selection.getSelectedGridRows();
        var rows = selection.getSelectedRows();
        for (var i = 0; i < rows.length; i++) {
            var param = rows[i];
            var index = $scope.gridParamconf.data.indexOf(param);
            var paramconfCod = param.cod;
            $scope.gridParamconf.data.splice(index, 1);
            $http.delete('/api/paramconfs/' + paramconfCod).success(function(data) {
                    $scope.paramconfs.splice(index, 1);
                })
                .error(function(err) {
                    alert('Error deleteParamconf');
                });
        }
    };
    $scope.addNewgridParamconf = function() {
        $scope.gridParamconf.data.unshift({});
    };

    $scope.gridParamconf.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            var msg = 'row selected ' + row.isSelected;
        });
        gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
            var msg = 'rows changed ' + rows.length;
        });
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
        //non funziona
        /* gridApi.colResizable.on.columnSizeChanged($scope, function(colDef, deltaChange) {
                console.log('resized #############');
            });*/


    };

    $scope.saveRow = function(rowEntity) {
        var promise = $scope.saveRowFunction(rowEntity);
        $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
    };
    $scope.saveRowFunction = function(row) {
        var deferred = $q.defer();
        if (row._id === undefined) {
            $http.post('/api/paramconfs', row).success(deferred.resolve).error(deferred.reject);
        } else {
            paramconfService.updateParamconf(row)
                .then(function(paramconfUpdated) {
                    row = paramconfUpdated;
                    deferred.resolve(paramconfUpdated);
                }).catch(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });
        }
        return deferred.promise;
    };
    //esempio per eliminare colonne in resize
    angular.element($window).bind('resize', function() {
        $timeout(function() {
            console.log($window.innerWidth);
            if ($window.innerWidth < 480) {
                $scope.gridParamconf.columnDefs[1].visible = false;
                $scope.gridParamconf.columnDefs[3].visible = false;
                $scope.gridParamconf.columnDefs[4].visible = false;

            } else {
                $scope.restoreState();
            }
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

        }, 500);

    });
    $scope.saveState = function() {
        $scope.state = $scope.gridApi.saveState.save();
        $cookieStore.put('testUser_gridParamconf', $scope.state);
    };

    $scope.restoreState = function() {
        var favoriteCookie = $cookieStore.get('testUser_gridParamconf');
        if (favoriteCookie !== undefined && favoriteCookie !== null)
            $scope.gridApi.saveState.restore($scope, favoriteCookie);
    };


    $http.get('/api/paramconfs')
        .success(function(data) {
            $scope.paramconfs = data;
            $scope.gridParamconf.data = data;
            console.log($scope.paramconfs);
            $scope.restoreState();
        })
        .error(function(err) {
            alert('Error! Something went wrong');
        });

});
