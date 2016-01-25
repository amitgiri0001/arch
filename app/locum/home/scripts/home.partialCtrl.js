define(['app'], function (app) {
    'use strict';
    return ['$scope', 'api','commonService','commonFactory','$state',function ($scope,api,commonService,commonFactory,$state) {

        $scope.message = 'Welcome to Home Partial';
    }];
});
