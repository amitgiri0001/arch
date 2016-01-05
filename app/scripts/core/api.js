define(['angularAMD','routes'], function (app,routes) {
  'use strict';

  function ScopeBinding(scope, property, parameters, _scopeBindings) {
    this.scope = scope;
    this.property = property;
    this.parameters = parameters;
    this._scopeBindings = _scopeBindings;
    this._ignore = [];
    this.logLabel = 'scope' + this.scope.n + '[' + this.property + ']';
  }
  ScopeBinding.prototype.log = function () {
  };
  ScopeBinding.prototype.isInterested = function (value, parameters) {
    return this._ignore.indexOf(value) === -1 && angular.equals(parameters, this.parameters) && !angular.equals(value, this.getValue());
  };
  ScopeBinding.prototype.onWatch = function (value) {
    if (this._ignore.indexOf(value) !== -1) {
      return;
    }
    this._ignore.push(value);
    try {
      this.log('onWatch', value);
      for (var i = 0; i < this._scopeBindings.length; i++) {
        var sb = this._scopeBindings[i];
        if (sb !== this && sb.isInterested(value, this.parameters)) {
          this.log('onWatch-update(' + sb.logLabel + ')', value);
          sb._ignore.push(value);
          try {
            sb.setValue(value);
          }
          finally {
            sb._ignore.pop();
          }
        }
      }
    }
    finally {
      this._ignore.pop();
    }
  };
  ScopeBinding.prototype.getValue = function () {
    return this.scope[this.property];
  };
  ScopeBinding.prototype.setValue = function (value) {
    this.log('setValue', value);
    this.scope[this.property] = value;
  };

  function ApiNode(_uri, $resource, config) {
   var configDefaults ={
      update: {
        method: 'PUT'
      }};

    _.assign(configDefaults, config);

    var self = $resource(_uri, {}, configDefaults);

    Object.defineProperty(self, 'uri', {
      get: function () {
        return _uri;
      }
    });
    var _scopeBindings = [];
    self.bindScope = function (scope, property, parameters, isQuery) {
      var sb = new ScopeBinding(scope, property, parameters, _scopeBindings);

      _scopeBindings.push(sb);
      sb.log('parameters', parameters);
      sb.log('self.get(...)', scope[property]);
      var getThen = function (value) {
        sb.log('getThen', value);
        sb.unWatch = scope.$watch(property, angular.bind(sb, sb.onWatch), true);
      };
      sb.setValue(isQuery ? self.query(parameters, getThen) : self.get(parameters, getThen));
      return self;
    };
    self.bindScope1 = function (scope, property, parameters) {
      return self.bindScope(scope, property, parameters, false);
    };
    self.bindScopeN = function (scope, property, parameters) {
      return self.bindScope(scope, property, parameters, true);
    };
    self.map = function (property, relativeUriPath, config, childCallback) {
      var child = new ApiNode(_uri + relativeUriPath, $resource, config);
      Object.defineProperty(self, property, { value: child, writable: false });
      if (childCallback) {
        angular.bind(child, childCallback)(child);
      }
      return self;
    };
    self.matchUri = function (uri) {
      return _uri === uri;
    };

    return self;
  }

  app.factory('api', ['$resource', function ($resource) {
    var api = new ApiNode(routes.apiRoot, $resource);
    var toMap = [{ apiNode: api, value: routes.urls }];
    while (toMap.length > 0) {
      var item = toMap.pop();
      for (var p in item.value) {
        if (!item.value.hasOwnProperty(p)) {
          continue;
        }
        var pv = item.value[p];
        var queryConfigSettings = {get: { method: 'GET', cache: false}};
        var uri = '';
        if (typeof pv === 'string' || pv instanceof String) {
          uri = pv;
          pv = undefined;
        }
        else if (pv instanceof Array) {
          uri = pv[0];
          if(pv.length > 3){
            queryConfigSettings = pv[3];
          }
          pv = pv.length < 3 ? pv[1] : pv[2];

        }
        /* jshint ignore:start */
        item.apiNode.map(p, uri,queryConfigSettings, function (child) {
          toMap.push({ apiNode: child, value: pv });
        });
        /* jshint ignore:end */
      }
    }

    return api;
  }]);
});
