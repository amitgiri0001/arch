// load all the scripts defined below for application start.
// angularAMD is acting as app before angular bootstrap the application or module is created.
define(['angularAMD','angular','angular-ui-router','angular-resource','lodash','api','jquery','bootstrap'], function (app) {
  'use strict';

// include-html is a custom directive for injecting html which will share the same current scope i.e not child of current scope
  app.directive('includeHtml', function() {
    return {
      templateUrl: function(elem, attrs) {
        return attrs.url || '../404.html';
      }
    }
  });

  app.service('commonService',function(){
    this.testVar = 'testService';
  });

  app.factory('commonFactory',function(){
    var f = {};
    f.testFucntion = function(){
      console.log('testFactory');
    };

    return f;
  });

  return app;
});
