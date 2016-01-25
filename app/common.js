// load all the scripts defined below for application start.
// angularAMD is acting as app before angular bootstrap the application or module is created.
define(['angularAMD', 'angular', 'angular-ui-router', 'angular-resource', 'lodash', 'api', 'jquery', 'bootstrap'], function(app) {
  'use strict';

  // include-html is a custom directive for injecting html which will share the same current scope i.e not child of current scope
  app.directive('includeHtml', function() {
    return {
      templateUrl: function(elem, attrs) {
        return attrs.url || '../404.html';
      }
    }
  });

  app.service('commonService', function() {
    this.testVar = 'testService';
  });

  app.factory('commonFactory', function() {
    var f = {};
    f.testFucntion = function() {
      console.log('testFactory');
    };

    return f;
  });

  app.factory('authSrv', ['$q',function($q) {

    var v = {};
    v.validateLogin = function () {
      if (localStorage.getItem('token')) {
        return true;
      }
      return false;
    };

    v.validateLogout = function () {
      return !v.validateLogin();
    };

    v.validateAccess = function (role) {
      if (localStorage.getItem('token') && _.contains(localStorage.getItem('token'),role)) {
        return true;
      }
      return false;
    };

    function isAuthenticatedState(obj,callBack) {
      var retVal = true;
      if (obj.toState.data && obj.toState.data.permmission) {
        if (obj.toState.data.permmission.expect && obj.toState.data.permmission.expect.length > 0) {
          _.forEach(obj.toState.data.permmission.expect,function (val,key) {
            retVal = retVal && v['validate' + val]();
          });
        }
        if(obj.toState.data.permmission.access && obj.toState.data.permmission.access.length > 0){
          _.forEach(obj.toState.data.permmission.access,function (val,key) {
            retVal = retVal && v.validateAccess(val);
          });
        }
      }

      return retVal;
    }

    var f = {};

    f.loginRedirect = function(to) {
      //require(['admin']);
    };

    f.isAuthenticated = function (component,obj,callBack) {
      switch (component) {
        case 'state':
          return isAuthenticatedState(obj,callBack);
          break;
        default:

      }
    }

    return f;
  }]);

  return app;
});
