angular.module('app.directives', [])

  .directive('checkList', function() {
    return {
      scope: {
        list: '=cycleList',
        list2:'=checkList',
        list3:'=houseList',
        value: '@'
      },
      link: function(scope, elem, attrs) {
        let handler = function(setup) {
          let checked = elem.prop('checked');
          let index = scope.list.indexOf(parseInt(scope.value));
          let newName = ''

          if (checked && index == -1) {
            if (setup) elem.prop('checked', false);
            else {
              scope.list.push(parseInt(scope.value));
              newName = scope.list3.filter(obj => {
                  return obj.id == scope.value
                })[0].name
              scope.list2.push(newName);
            }
          } else if (!checked && index != -1) {
            if (setup) elem.prop('checked', true);
            else {
              scope.list.splice(index, 1);
              scope.list2.splice(index, 1);
            }
          }
        };

        let setupHandler = handler.bind(null, true);
        let changeHandler = handler.bind(null, false);

        elem.on('change', function() {
          scope.$apply(changeHandler);
        });
        scope.$watch('list', setupHandler, true);
      }
    };
  })

  /*
    This directive is used to open regular and dynamic href links inside of inappbrowser.
  */
  .directive('hrefInappbrowser', function() {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function(scope, element, attrs) {
        let href = attrs['hrefInappbrowser'];

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
