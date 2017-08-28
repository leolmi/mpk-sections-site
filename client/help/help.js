'use strict';

angular.module('sectionsSite')
  .config(function ($stateProvider) {
    $stateProvider
      .state('help-client', {
        url: '/help-client',
        templateUrl: 'help/pages/client.html',
        controller: 'HelpCtrl'
      })
      .state('help-server', {
        url: '/help-server',
        templateUrl: 'help/pages/server.html',
        controller: 'HelpCtrl'
      });
  });
