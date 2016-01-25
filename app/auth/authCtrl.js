define(['app'], function (app) {
    'use strict';
    app.controller('authCtrl', ['$scope', 'api','commonService','commonFactory','$state',function (scope,api,commonService,commonFactory,$state) {
        scope.message = 'Welcome to Home Page';
        scope.submitForm = function(){
          localStorage.setItem('token','admin');
          $state.go('locum.home');
        };
    }]);
});
