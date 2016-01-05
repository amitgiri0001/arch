define([],function(){
  'use strict'

  var routes =
    {
      Employee: ['employee/:employeeId/', undefined, {
        organisation: 'organisation/'
      }],

    };

    return {
      urls: routes,
      apiRoot: 'localhost:3000/'
    };
});
