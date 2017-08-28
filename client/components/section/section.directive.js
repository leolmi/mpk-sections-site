'use strict';

angular.module('sectionsSite')
  .directive('section',['$window',
    function($window) {
      return {
        scope:{options:'='},
        transclude: true,
        template: '<div class="section" ng-class="o.classes" ng-style="style" image-cover ng-transclude ng-cloak></div>',
        link: function(scope, ele, atr) {
          scope.o = {};
          _.extend(scope.o, scope.options);
          scope.o.style = scope.o.style || {};

          function _setSize(size) {
            var target = $('.section',ele);
            if (!target) return;
            target.width(size.width);
            if (scope.o.padding!==false && !target.hasClass('padding')) {
              target.addClass('padding');
            }
            if (scope.o.fill === true) {
              target.height(size.height);
              if (!target.hasClass('filled')) target.addClass('filled');
            }
            if (_.isFunction((scope.options || {}).setSize)) {
              scope.options.setSize({width: size.width, height: size.height});
            }
          }

          function _setWindowSize() {
            _setSize({width: $window.innerWidth, height: $window.innerHeight});
          }
          function _setContainerSize() {
            _setSize({width: _container.innerWidth(), height: _container.innerHeight()});
          }

          var _container = scope.o.container ? $(scope.o.container) : undefined;
          if (_container) {
            _container.on('mresize', _setContainerSize);
          } else {
            $window.addEventListener('resize', _setWindowSize);
          }

          const _style = {};
          _style['background-image'] = scope.o.background ? 'url(' + scope.o.background + ')' : undefined;
          _.extend(_style, scope.o.style);
          scope.style = _style;

          scope.$on('$destroy', function() {
            if (!_container) $window.removeEventListener('resize', _setWindowSize);
          });

          if (_container) {
            _setContainerSize();
          } else {
            _setWindowSize();
          }
        }
      }
    }
  ]);
