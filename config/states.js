define(['angularAMD'], function(angularAMD) {

  var states = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    var LocumPath = 'locum/',
      adminPath = 'admin/';
    var expect = e = {
      login: 'Login',
      logout: 'Logout'
    };
    var access = a = {
      admin: 'admin',
      locum: 'locum'
    };
    var loginState = 'auth', previousState = 'previousState';

    $urlRouterProvider
      .otherwise('/' + loginState);

    $stateProvider
    // multiview example
      .state(loginState, angularAMD.route({
        url: '/auth',
        data: {
          permmission: {
            expect: [e.logout],
            redirectUrl: previousState
          }
        },
        views: {
          // default view / main view with parent controller
          "": angularAMD.route({
            templateUrl: 'auth/index.html',
            controllerUrl: 'auth/authCtrl',
            // need to add controller name in multi view
            controller: 'authCtrl'
          }),
          "header": {
            templateUrl: 'auth/header.html'
          },
          "footer": {
            templateUrl: 'auth/footer.html'
          }
        }
      }))
      .state('locum', angularAMD.route({
        url: '/locum',
        abstract: true,
        data: {
          permmission: {
            expect: [e.login],
            access: [a.admin],
            redirectUrl: loginState
          }
        },
        views: {
          "": angularAMD.route({
            template: '<div ui-view="header"></div><div ui-view></div><div ui-view="footer"></div>',
            controllerUrl: LocumPath + 'mainCtrl',
            // need to add controller name in multi view
            controller: 'mainCtrl'
          }),
          "header@locum": {
            templateUrl: LocumPath + 'home/partials/header.html'
          },
          "footer@locum": {
            templateUrl: LocumPath + 'home/partials/footer.html'
          }
        }
      }))
      .state('locum.home', angularAMD.route({
        url: '/home',
        data: {
          permmission: {
            expect: [e.login],
            access: [a.admin],
            redirectUrl: loginState
          }
        },
        views: {
          // default view / main view with parent controller
          "": angularAMD.route({
            templateUrl: LocumPath + 'home/partials/home.html',
            controllerUrl: LocumPath + 'home/scripts/homeCtrl',
            controller: 'homeCtrl'
          })
        }
      }));

  }];

  return states;

});
