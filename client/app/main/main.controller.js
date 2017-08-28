'use strict';

angular.module('sectionsSite')
  .controller('MainCtrl', ['$scope','appConfig','$http','socket',
    function ($scope, appConfig, $http, socket) {
      $scope.appInfo = appConfig.info;

      $scope.coverOptions = {
        fill: true,
        background: 'assets/images/bg.jpg'
      };
      $scope.otherOptions = {
        style: {'background-color': 'beige'}
      };
      $scope.otherOtherOptions = {
        style: {'background-color': '#ccc', color: 'white'},
        background: 'assets/images/bg.jpg'
      };
      $scope.browserOptions = {
        padding: false
      };
      $scope.imgBrowserOptions = {
        title: 'Browser',
        items:[{
          img: 'assets/test/05.jpg'
        },{
          img: 'assets/test/02.jpg'
        },{
          img: 'assets/test/03.jpg'
        },{
          img: 'assets/test/04.jpg'
        }]
      };

      // $scope.awesomeThings = [];
      //
      // $http.get('/api/things').then(function(resp) {
      //   $scope.awesomeThings = resp.data;
      //   socket.syncUpdates('thing', $scope.awesomeThings);
      // });
      //
      // $scope.addThing = function() {
      //   if($scope.newThing === '') {
      //     return;
      //   }
      //   $http.post('/api/things', { name: $scope.newThing });
      //   $scope.newThing = '';
      // };
      //
      // $scope.deleteThing = function(thing) {
      //   $http.delete('/api/things/' + thing._id);
      // };
      //
      // $scope.$on('$destroy', function () {
      //   socket.unsyncUpdates('thing');
      // });
    }]);
