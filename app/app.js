define(['common'], function(angularAMD) {
  'use strict';

  var app = angular.module('app', ['ui.router', 'ngResource']);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var modulesFolder = 'modules/';
    var partialsFolder = '/partials/';
    var scriptsFolder = '/scripts/';

    $stateProvider
      // multiview example
      .state('home', angularAMD.route({
        url: '/home',
        views: {
          // default view / main view with parent controller
          "": angularAMD.route({
                templateUrl: modulesFolder + 'home' + partialsFolder + 'home.html',
                controllerUrl: modulesFolder + 'home' + scriptsFolder + 'homeCtrl',
                // need to add controller name in multi view
                controller: 'homeCtrl'
          }),
          "partial1@home": {
            template: "this is partial one"
          },
          "partial2@home": {
            template: "this is partial two"
          }
        }
      }))
      // nested view example
      .state('about', angularAMD.route({
        url: '/about',
        templateUrl: modulesFolder + 'about' + partialsFolder + 'about.html',
        controllerUrl: modulesFolder + 'about' + scriptsFolder + 'aboutCtrl'
      }))
      .state('about.list', angularAMD.route({
        url: '/list',
        templateUrl: modulesFolder + 'about' + partialsFolder + 'about.list.html'
      }));

    // Else
    $urlRouterProvider
      .otherwise('/home');


  }]);



  return angularAMD.bootstrap(app);
});
