angular.module('app.directives', [])

  .directive('checkList', function() {
    return {
      scope: {
        list: '=checkList',
        value: '@'
      },
      link: function(scope, elem, attrs) {
        var handler = function(setup) {
          var checked = elem.prop('checked');
          var index = scope.list.indexOf(parseInt(scope.value));

          if (checked && index == -1) {
            if (setup) elem.prop('checked', false);
            else scope.list.push(parseInt(scope.value));
          } else if (!checked && index != -1) {
            if (setup) elem.prop('checked', true);
            else scope.list.splice(index, 1);
          }
        };

        var setupHandler = handler.bind(null, true);
        var changeHandler = handler.bind(null, false);

        elem.on('change', function() {
          scope.$apply(changeHandler);
        });
        scope.$watch('list', setupHandler, true);
      }
    };
  })





  // Moved from app. If something breaks, move back?
  /*
    This directive is used to disable the "drag to open" functionality of the Side-Menu
    when you are dragging a Slider component.
  */
  .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

        function stopDrag() {
          $ionicSideMenuDelegate.canDragContent(false);
        }

        function allowDrag() {
          $ionicSideMenuDelegate.canDragContent(true);
        }

        $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
        $element.on('touchstart', stopDrag);
        $element.on('touchend', allowDrag);
        $element.on('mousedown', stopDrag);
        $element.on('mouseup', allowDrag);

      }]
    };
  }])

  /*
    This directive is used to open regular and dynamic href links inside of inappbrowser.
  */
  .directive('hrefInappbrowser', function() {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function(scope, element, attrs) {
        var href = attrs['hrefInappbrowser'];

        attrs.$observe('hrefInappbrowser', function(val) {
          href = val;
        });

        element.bind('click', function(event) {

          window.open(href, '_system', 'location=yes');

          event.preventDefault();
          event.stopPropagation();

        });
      }
    };
  });
