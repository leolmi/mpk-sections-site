'use strict';

angular.module('sectionsSite')
  .directive('imgBrowser',['$window',
    function($window) {
      return {
        scope: {options: '='},
        transclude: true,
        templateUrl: 'components/img-browser/img-browser.html',
        link: function (scope, ele, atr) {
          var _size;
          scope.o = {};
          _.extend(scope.o, scope.options);
          scope.o.items = scope.o.items||[];
          scope.o.current = scope.o.current||0;

          function _setWindowSize(skip) {
            _size = {width: $window.innerWidth, height: $window.innerHeight};
            if (skip!==true) _refresh();
          }

          function _refresh() {
            var $container = $('.img-container', ele);
            if (!$container) return;
            if (!_size) _setWindowSize(true);
            const item = (_.isNumber(scope.o.current)&&scope.o.current>-1&&scope.o.current<scope.o.items.length) ?
              scope.o.items[scope.o.current]||'' : '';
            scope.browserStyle = {
              'background-image': (item&&item.img) ? 'url(' + item.img + ')' : undefined
            };
            $container.width(_size.width);
            $container.height(_size.height);
          }

          function _next() {
            scope.o.current++;
            if (scope.o.current>=scope.o.items.length) scope.o.current = 0;
            _refresh();
          }
          function _prev() {
            scope.o.current--;
            if (scope.o.current < 0) scope.o.current = scope.o.items.length ? scope.o.items.length - 1 : 0;
            _refresh();
          }

          $window.addEventListener('resize', _setWindowSize);

          scope.prev = _prev;
          scope.next = _next;
          scope.show = function(index) {
            scope.o.current = index;
            _refresh();
          };

          scope.$on('$destroy', function() {
            $window.removeEventListener('resize', _setWindowSize);
          });

          _refresh();
        }
      }
    }]);
