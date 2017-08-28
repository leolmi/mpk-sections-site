'use strict';

angular.module('sectionsSite')
  .provider('appConfig',
    function() {
      var _info = {
        name: 'App Name',
        version: '0.0.0'
      };

      this.$get = function () {
        return {
          info: _info
        };
      };
    });
