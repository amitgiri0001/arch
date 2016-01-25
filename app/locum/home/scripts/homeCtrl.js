define(['app'], function (app) {
    'use strict';
    app.controller('homeCtrl', ['$scope', 'api','commonService','commonFactory','$state',function ($scope,api,commonService,commonFactory,$state) {
        $scope.message = 'Welcome to Home Page';
    }]);
});
