//
// Intentionally, this controller is not injected for now as main controller for application. We shall not be using it until we see a real requirment for it.
//
define(['angularAMD'], function(app) {
  'use strict';
  app.controller('appCtrl', ['$scope', function($scope) {
    $scope.message = 'Welcome to app root ctrl';
  }]);
});
