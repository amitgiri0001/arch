(function() {
  'use strict'

  var coreScriptFolder = 'common/scripts/core/';
  var extScriptFolder = 'common/scripts/ext/';

// requireJs base configuration
  require.config({
    // baseUrl is the base path which will be prepending to the paths object values below for scripts source
    // the baseUrl will be appended always after the <base href="/arch/app/" /> tag's href in html to find the scripts
    baseUrl: "",
    // paths are the name and path pairs for each scripts which may be loaded on demand.
    // mentioning path doesnot load the scripts, it just to let requireJs understand the path by name when required to load it.
    paths: {
      'angular': coreScriptFolder + 'angular.min',
      'angularAMD': coreScriptFolder + 'angularAMD.min',
      'angular-ui-router': coreScriptFolder + 'angular-ui-router.min',
      //'ngload': coreScriptFolder + 'ngload.min',
      'angular-resource': coreScriptFolder + 'angular-resource.min',
      'lodash': extScriptFolder + 'lodash.min',
      'routes': '../config/routes',
      'states': '../config/states',
      'api': coreScriptFolder + 'api.min',
      'app': 'app',
      'bootstrap': extScriptFolder + 'bootstrap.min',
      'jquery': extScriptFolder + 'jquery-2.1.4.min',
      'common': 'common'
    },
    // shim => dependency.
    // when any script loads, what dependencies has to be loaded before that will be decided by shim object.
    shim: {
      'angular':['jquery'],
      'angular-resource': ['angular'],
      'angular-ui-router': ['angular'],
      'angularAMD': ['angular'],
      'bootstrap':['jquery'],
      'states': ['angularAMD']
      //'ngload': ['angularAMD']
    },
    // after all configurations are done, what next file will be executed is under deps.
    deps: ['app']
  });

}());
