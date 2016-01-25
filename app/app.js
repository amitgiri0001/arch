define(['common', 'states'], function(angularAMD, states) {
  'use strict';

  var auth = angular.module('auth', ['ui.router', 'ngResource']);
  auth.config(states);

  auth.run(['$rootScope', '$state', 'authSrv', '$urlRouter', function($rootScope, $state, authSrv, $urlRouter) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

      var stateObj = {
        toState: toState,
        toParams: toParams,
        fromState: fromState,
        fromParams: fromParams
      };

      if (authSrv.isAuthenticated('state', stateObj)) {
        // is authenticated
      } else {
        event.preventDefault();
        if(toState.data.permmission.redirectUrl == 'previousState' && fromState.name){
          $state.go(fromState.name);
        }
        else {
          $state.go(toState.data.permmission.redirectUrl);
        }
      }

      // if(localStorage.getItem('hello')){
      //   event.preventDefault();
      //   require(['locum/locumApp'],function () {
      //   $state.go('/home');
      //   });
      //
      // }

      //authSrv.loginRedirect();
    });
  }]);


  return angularAMD.bootstrap(auth);
});
