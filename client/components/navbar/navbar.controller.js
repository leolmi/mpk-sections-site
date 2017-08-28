'use strict';

angular.module('sectionsSite')
  .controller('NavbarCtrl', ['$scope','$location','appConfig','Auth',
    function ($scope, $location, appConfig, Auth) {
      $scope.menu = [{
        'title': 'Home',
        'link': '/'
      }];

      $scope.isCollapsed = true;
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.isAdmin = Auth.isAdmin;
      $scope.getCurrentUser = Auth.getCurrentUser;
      $scope.appInfo = appConfig.info;

      $scope.logout = function () {
        Auth.logout();
        $location.path('/login');
      };

      $scope.isActive = function (route) {
        return route === $location.path();
      };
    }]);
